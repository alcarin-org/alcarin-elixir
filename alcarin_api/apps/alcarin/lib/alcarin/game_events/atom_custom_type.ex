defmodule Alcarin.GameEvents.AtomCustomType do
  @behaviour Ecto.Type
  def type, do: :string

  def cast(game_event_type) when is_atom(game_event_type) do
    {:ok, game_event_type}
  end
  def cast(_), do: :error

  def load(value), do: {:ok, String.to_atom(value)}

  def dump(value) when is_atom(value), do: {:ok, Atom.to_string(value)}
  def dump(_), do: :error
end
