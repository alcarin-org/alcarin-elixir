defmodule Alcarin.GameEvents do
  @moduledoc """
  The GameEvents context.
  """

  import Ecto.Query, warn: false
  alias Alcarin.Repo

  alias Alcarin.GameEvents.GameEvent

  @doc """
  Returns the list of game_events.

  ## Examples

      iex> list_game_events()
      [%GameEvent{}, ...]

  """
  def list_game_events do
    Repo.all(GameEvent)
  end

  @doc """
  Creates a game speak event.

  ## Examples

      iex> create_speak_event(%{content: "Help me, please"})
      {:ok, %GameEvent{}}

      iex> create_speak_event(%{field: ""})
      {:error, %Ecto.Changeset{}}

  """
  def create_speak_event(content) do
    %GameEvent{}
    |> GameEvent.changeset(%{type: :speak, args: %{"content" => content}})
    |> Repo.insert()
  end
end
