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
  Gets a single game_event.

  Raises `Ecto.NoResultsError` if the Game event does not exist.

  ## Examples

      iex> get_game_event!(123)
      %GameEvent{}

      iex> get_game_event!(456)
      ** (Ecto.NoResultsError)

  """
  def get_game_event!(id), do: Repo.get!(GameEvent, id)

  @doc """
  Creates a game_event.

  ## Examples

      iex> create_game_event(%{field: value})
      {:ok, %GameEvent{}}

      iex> create_game_event(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_game_event(attrs \\ %{}) do
    %GameEvent{}
    |> GameEvent.changeset(attrs)
    |> Repo.insert()
  end


  @doc """
  Returns an `%Ecto.Changeset{}` for tracking game_event changes.

  ## Examples

      iex> change_game_event(game_event)
      %Ecto.Changeset{source: %GameEvent{}}

  """
  def change_game_event(%GameEvent{} = game_event) do
    GameEvent.changeset(game_event, %{})
  end
end
