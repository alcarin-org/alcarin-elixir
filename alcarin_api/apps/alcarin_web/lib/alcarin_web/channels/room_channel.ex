defmodule AlcarinWeb.RoomChannel do
  use Phoenix.Channel

  def join("room:lobby", _message, socket) do
    {:ok, %{test:  5}, socket}
  end

  def join("room:" <> _private_room_id, _params, _socket) do
    {:error, %{reason: "unauthorized"}}
  end

  def handle_in("msg", %{"msg" => new_msg}, socket) do
    IO.puts new_msg
    {:noreply, socket}
  end
end
