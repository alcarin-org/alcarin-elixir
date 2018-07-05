defmodule AlcarinWeb.CharacterFeedChannelTest do
  use AlcarinWeb.ChannelCase
  import AlcarinWeb.RandomCase

  alias AlcarinWeb.CharacterFeedChannel

  test "character feed for specific user should be unauthorized for now" do
    join_reply =
      socket("feed_socket", %{})
      |> subscribe_and_join(CharacterFeedChannel, "character-feed:123")

    assert join_reply == {:error, %{reason: "unauthorized"}}
  end

  describe "connected channel" do
    setup do
      {:ok, _, socket} =
        socket("feed_socket", %{})
        |> subscribe_and_join(CharacterFeedChannel, "character-feed:lobby")

      {:ok, socket: socket}
    end

    test "'communication:say' event should register speak messages", %{socket: socket} do
      check all speak_content <- StreamData.string(:alphanumeric, min_length: 1) do
        ref = push(socket, "communication:say", %{"content" => speak_content})
        assert_reply(ref, :ok)
      end
    end

    test "'communication:say' event should reject empty speak messages", %{socket: socket} do
      ref = push(socket, "communication:say", %{"content" => ""})
      assert_reply(ref, :error, %{errors: %{"args.content": ["can't be blank"]}})
    end

    test "should reject unknown messages", %{socket: socket} do
      ref = push(socket, random_string(20), %{"content" => "test content"})
      assert_reply(ref, :error, %{error: "Unknown message type"})
    end
  end
end
