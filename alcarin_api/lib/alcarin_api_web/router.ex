defmodule AlcarinApiWeb.Router do
  use AlcarinApiWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", AlcarinApiWeb do
    pipe_through :api

    get "/test", TestController, :index
  end
end
