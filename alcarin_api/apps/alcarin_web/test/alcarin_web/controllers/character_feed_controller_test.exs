defmodule AlcarinWeb.CharacterFeedControllerTest do
  use AlcarinWeb.ConnCase

  alias Alcarin.GameEvent
  alias Alcarin.GameEvent.CharacterFeed

  @create_attrs %{}
  @update_attrs %{}
  @invalid_attrs %{}

  def fixture(:character_feed) do
    {:ok, character_feed} = GameEvent.create_character_feed(@create_attrs)
    character_feed
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all game_events", %{conn: conn} do
      conn = get(conn, character_feed_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create character_feed" do
    test "renders character_feed when data is valid", %{conn: conn} do
      conn = post(conn, character_feed_path(conn, :create), character_feed: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, character_feed_path(conn, :show, id))
      assert json_response(conn, 200)["data"] == %{"id" => id}
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, character_feed_path(conn, :create), character_feed: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update character_feed" do
    setup [:create_character_feed]

    test "renders character_feed when data is valid", %{
      conn: conn,
      character_feed: %CharacterFeed{id: id} = character_feed
    } do
      conn =
        put(
          conn,
          character_feed_path(conn, :update, character_feed),
          character_feed: @update_attrs
        )

      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, character_feed_path(conn, :show, id))
      assert json_response(conn, 200)["data"] == %{"id" => id}
    end

    test "renders errors when data is invalid", %{conn: conn, character_feed: character_feed} do
      conn =
        put(
          conn,
          character_feed_path(conn, :update, character_feed),
          character_feed: @invalid_attrs
        )

      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete character_feed" do
    setup [:create_character_feed]

    test "deletes chosen character_feed", %{conn: conn, character_feed: character_feed} do
      conn = delete(conn, character_feed_path(conn, :delete, character_feed))
      assert response(conn, 204)

      assert_error_sent(404, fn ->
        get(conn, character_feed_path(conn, :show, character_feed))
      end)
    end
  end

  defp create_character_feed(_) do
    character_feed = fixture(:character_feed)
    {:ok, character_feed: character_feed}
  end
end
