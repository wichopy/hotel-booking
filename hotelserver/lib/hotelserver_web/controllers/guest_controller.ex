defmodule HotelserverWeb.GuestController do
  use HotelserverWeb, :controller

  alias Hotelserver.Hotel
  alias Hotelserver.Hotel.Guest

  action_fallback HotelserverWeb.FallbackController

  def index(conn, _params) do
    guests = Hotel.list_guests()
    render(conn, "index.json", guests: guests)
  end

  def create(conn, %{"guest" => guest_params}) do
    with {:ok, %Guest{} = guest} <- Hotel.create_guest(guest_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", guest_path(conn, :show, guest))
      |> render("show.json", guest: guest)
    end
  end

  def show(conn, %{"id" => id}) do
    guest = Hotel.get_guest!(id)
    render(conn, "show.json", guest: guest)
  end

  def update(conn, %{"id" => id, "guest" => guest_params}) do
    guest = Hotel.get_guest!(id)

    with {:ok, %Guest{} = guest} <- Hotel.update_guest(guest, guest_params) do
      render(conn, "show.json", guest: guest)
    end
  end

  def delete(conn, %{"id" => id}) do
    guest = Hotel.get_guest!(id)
    with {:ok, %Guest{}} <- Hotel.delete_guest(guest) do
      send_resp(conn, :no_content, "")
    end
  end
end
