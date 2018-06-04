defmodule HotelserverWeb.Router do
  use HotelserverWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", HotelserverWeb do
    pipe_through :api
  end
end
