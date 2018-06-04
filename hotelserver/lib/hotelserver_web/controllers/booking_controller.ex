defmodule HotelserverWeb.BookingController do
  use HotelserverWeb, :controller

  alias Hotelserver.Hotel
  alias Hotelserver.Hotel.Booking

  action_fallback HotelserverWeb.FallbackController

  def index(conn, _params) do
    bookings = Hotel.list_bookings()
    render(conn, "index.json", bookings: bookings)
  end

  def create(conn, %{"booking" => booking_params}) do
    with {:ok, %Booking{} = booking} <- Hotel.create_booking(booking_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", booking_path(conn, :show, booking))
      |> render("show.json", booking: booking)
    end
  end

  def show(conn, %{"id" => id}) do
    booking = Hotel.get_booking!(id)
    render(conn, "show.json", booking: booking)
  end

  def update(conn, %{"id" => id, "booking" => booking_params}) do
    booking = Hotel.get_booking!(id)

    with {:ok, %Booking{} = booking} <- Hotel.update_booking(booking, booking_params) do
      render(conn, "show.json", booking: booking)
    end
  end

  def delete(conn, %{"id" => id}) do
    booking = Hotel.get_booking!(id)
    with {:ok, %Booking{}} <- Hotel.delete_booking(booking) do
      send_resp(conn, :no_content, "")
    end
  end
end
