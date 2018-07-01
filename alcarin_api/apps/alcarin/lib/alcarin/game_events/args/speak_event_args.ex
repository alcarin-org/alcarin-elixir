defmodule Alcarin.GameEvents.Args.SpeakEventArgs do
  use Ecto.Schema
  import Ecto.Changeset

  embedded_schema do
    field(:content, :string)
  end

  @doc false
  def changeset(game_event_args, attrs) do
    game_event_args
    |> cast(attrs, [:content])
    |> validate_required([:content])
    |> validate_length(:content, min: 1)
  end
end
