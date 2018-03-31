defmodule AlcarinWeb.ApiController do
  use AlcarinWeb, :controller

  def index(conn, %{"wot" => wot}) do
    conn
      |> put_status(:not_found)
      # |> put_flash(:info, "Welcome to Phoenix, from flash info!")
      |> json %{test: wot}
  end
end
