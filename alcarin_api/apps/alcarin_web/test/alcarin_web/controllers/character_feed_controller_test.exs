defmodule AlcarinWeb.CharacterFeedControllerTest do
  use AlcarinWeb.ConnCase

  alias Alcarin.GameEvents

  @moduletag :ctrl_case
  @moduletag :feed_case

  # @create_attrs %{}
  # @update_attrs %{}
  # @invalid_attrs %{}

  def fixture(:character_feed) do
    game_events = Enum.map(1..3, &GameEvents.create_speak_event("Test#{&1}"))
    for {:ok, character_feed} <- game_events, do: character_feed
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  # test "an test without a body"

  describe "index" do
    setup [:create_character_feed]

    test "lists all game_events", %{conn: conn} do
      url = AlcarinWeb.Router.Helpers.character_feed_path(conn, :feed, 13)
      resp = conn
        |> get(url)
        |> json_response(200)
      assert resp == %{"game_events" => [
        %{"type" => "speak", "args" => %{"content" => "Test1"}},
        %{"type" => "speak", "args" => %{"content" => "Test2"}},
        %{"type" => "speak", "args" => %{"content" => "Test3"}}
      ]}
    end
  end

  # describe "create character_feed" do
    # test "renders character_feed when data is valid", %{conn: conn} do
    #   conn = post(conn, character_feed_path(conn, :create, 13), character_feed: @create_attrs)
    #   assert %{"id" => id} = json_response(conn, 201)["data"]

    #   conn = get(conn, character_feed_path(conn, :show, id))
    #   assert json_response(conn, 200)["data"] == %{"id" => id}
    # end

  #   test "renders errors when data is invalid", %{conn: conn} do
  #     conn = post(conn, character_feed_path(conn, :create), character_feed: @invalid_attrs)
  #     assert json_response(conn, 422)["errors"] != %{}
  #   end
  # end

  # describe "update character_feed" do
  #   setup [:create_character_feed]

  #   test "renders character_feed when data is valid", %{
  #     conn: conn,
  #     character_feed: %CharacterFeed{id: id} = character_feed
  #   } do
  #     conn =
  #       put(
  #         conn,
  #         character_feed_path(conn, :update, character_feed),
  #         character_feed: @update_attrs
  #       )

  #     assert %{"id" => ^id} = json_response(conn, 200)["data"]

  #     conn = get(conn, character_feed_path(conn, :show, id))
  #     assert json_response(conn, 200)["data"] == %{"id" => id}
  #   end

  #   test "renders errors when data is invalid", %{conn: conn, character_feed: character_feed} do
  #     conn =
  #       put(
  #         conn,
  #         character_feed_path(conn, :update, character_feed),
  #         character_feed: @invalid_attrs
  #       )

  #     assert json_response(conn, 422)["errors"] != %{}
  #   end
  # end

  # describe "delete character_feed" do
  #   setup [:create_character_feed]

  #   test "deletes chosen character_feed", %{conn: conn, character_feed: character_feed} do
  #     conn = delete(conn, character_feed_path(conn, :delete, character_feed))
  #     assert response(conn, 204)

  #     assert_error_sent(404, fn ->
  #       get(conn, character_feed_path(conn, :show, character_feed))
  #     end)
  #   end
  # end

  defp create_character_feed(_) do
    {:ok, character_feed: fixture(:character_feed)}
  end
end
