defmodule Alcarin.GameEventsTest do
  use Alcarin.DataCase

  alias Alcarin.GameEvents

  describe "game_events" do
    alias Alcarin.GameEvents.GameEvent

    @valid_attrs %{args: %{}, type: "some type"}
    @update_attrs %{args: %{}, type: "some updated type"}
    @invalid_attrs %{args: nil, type: nil}

    def game_event_fixture(attrs \\ %{}) do
      {:ok, game_event} =
        attrs
        |> Enum.into(@valid_attrs)
        |> GameEvents.create_game_event()

      game_event
    end

    test "list_game_events/0 returns all game_events" do
      game_event = game_event_fixture()
      assert GameEvents.list_game_events() == [game_event]
    end

    test "get_game_event!/1 returns the game_event with given id" do
      game_event = game_event_fixture()
      assert GameEvents.get_game_event!(game_event.id) == game_event
    end

    test "create_game_event/1 with valid data creates a game_event" do
      assert {:ok, %GameEvent{} = game_event} = GameEvents.create_game_event(@valid_attrs)
      assert game_event.args == %{}
      assert game_event.type == "some type"
    end

    test "create_game_event/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = GameEvents.create_game_event(@invalid_attrs)
    end

    test "update_game_event/2 with valid data updates the game_event" do
      game_event = game_event_fixture()
      assert {:ok, game_event} = GameEvents.update_game_event(game_event, @update_attrs)
      assert %GameEvent{} = game_event
      assert game_event.args == %{}
      assert game_event.type == "some updated type"
    end

    test "update_game_event/2 with invalid data returns error changeset" do
      game_event = game_event_fixture()
      assert {:error, %Ecto.Changeset{}} = GameEvents.update_game_event(game_event, @invalid_attrs)
      assert game_event == GameEvents.get_game_event!(game_event.id)
    end

    test "delete_game_event/1 deletes the game_event" do
      game_event = game_event_fixture()
      assert {:ok, %GameEvent{}} = GameEvents.delete_game_event(game_event)
      assert_raise Ecto.NoResultsError, fn -> GameEvents.get_game_event!(game_event.id) end
    end

    test "change_game_event/1 returns a game_event changeset" do
      game_event = game_event_fixture()
      assert %Ecto.Changeset{} = GameEvents.change_game_event(game_event)
    end
  end
end
