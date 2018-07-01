defmodule AlcarinWeb.Router do
  use AlcarinWeb, :router

  pipeline :api do
    plug(:accepts, ["json"])
  end

  scope "/api", AlcarinWeb do
    pipe_through(:api)

    get("/character/:char_id/feed", CharacterFeedController, :feed)

    get("/test/:wot", ApiController, :index)

    resources "/players", PlayerController, except: [:edit, :new] do
      resources("/chars", CharacterController, except: [:edit, :new])
    end
  end
end
