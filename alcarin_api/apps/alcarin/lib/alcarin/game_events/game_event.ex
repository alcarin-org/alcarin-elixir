defmodule Alcarin.GameEvents.GameEvent do
  use Ecto.Schema
  import Ecto.Changeset

  alias Alcarin.GameEvents.Args
  alias Alcarin.GameEvents.AtomCustomType

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "game_events" do
    field(:type, AtomCustomType)
    field(:args, :map, default: %{})

    timestamps()
  end

  @doc false
  def changeset(game_event, attrs = %{type: event_type, args: event_args_change}) do
    args_schema = event_args_schema(event_type)
    event_args_struct = struct(args_schema, game_event.args)

    game_event
    |> cast(attrs, [:type, :args])
    |> validate_required([:type])
    |> validate_change(:args, fn :args, args ->
      %Ecto.Changeset{errors: err} =
        args_schema.changeset(
          event_args_struct,
          event_args_change
        )

      for {key, val} <- err, do: {String.to_atom("args.#{key}"), val}
    end)
  end

  def event_args_schema(:speak), do: Args.SpeakEventArgs
  def event_args_schema(event_type), do: throw("Unknown game event type: #{inspect(event_type)}")
end
