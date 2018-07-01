defmodule AlcarinWeb.CharacterFeedView do
  use AlcarinWeb, :view

  alias AlcarinWeb.CharacterFeedView
  alias Alcarin.GameEvents.GameEvent

  def render("feed.json", %{game_events: game_events}) do
    %{
      game_events:
        Enum.map(
          game_events,
          &Map.take(&1, [:type, :args])
        )
    }
  end
end
