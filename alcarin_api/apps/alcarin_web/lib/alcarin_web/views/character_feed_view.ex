defmodule AlcarinWeb.CharacterFeedView do
  use AlcarinWeb, :view

  alias Alcarin.GameEvents.GameEvent

  def render("feed.json", %{game_events: game_events}) do
    %{
      game_events:
        render_many(
          game_events,
          AlcarinWeb.CharacterFeedView,
          "feed-event.json"
        )
    }
  end

  def render("feed-event.json", %{character_feed: ev = %GameEvent{}}) do
    %GameEvent{type: type, args: args} = ev
    %{type: type, args: args}
  end
end
