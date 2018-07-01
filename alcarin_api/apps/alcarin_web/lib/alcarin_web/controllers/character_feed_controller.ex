defmodule AlcarinWeb.CharacterFeedController do
  use AlcarinWeb, :controller

  alias Alcarin.GameEvents

  action_fallback AlcarinWeb.FallbackController

  def feed(conn, _params) do
    game_events = GameEvents.list_game_events()
    render(conn, "feed.json", game_events: game_events)
  end

  # def create(conn, %{"character_feed" => character_feed_params}) do
  #   with {:ok, %CharacterFeed{} = character_feed} <- GameEvent.create_character_feed(character_feed_params) do
  #     conn
  #     |> put_status(:created)
  #     |> put_resp_header("location", character_feed_path(conn, :show, character_feed))
  #     |> render("show.json", character_feed: character_feed)
  #   end
  # end

  # def show(conn, %{"id" => id}) do
  #   character_feed = GameEvent.get_character_feed!(id)
  #   render(conn, "show.json", character_feed: character_feed)
  # end

  # def update(conn, %{"id" => id, "character_feed" => character_feed_params}) do
  #   character_feed = GameEvent.get_character_feed!(id)

  #   with {:ok, %CharacterFeed{} = character_feed} <- GameEvent.update_character_feed(character_feed, character_feed_params) do
  #     render(conn, "show.json", character_feed: character_feed)
  #   end
  # end

  # def delete(conn, %{"id" => id}) do
  #   character_feed = GameEvent.get_character_feed!(id)
  #   with {:ok, %CharacterFeed{}} <- GameEvent.delete_character_feed(character_feed) do
  #     send_r
  #     esp(conn, :no_content, "")
  #   end
  # end
end
