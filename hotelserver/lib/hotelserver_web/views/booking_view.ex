defmodule HotelserverWeb.BookingView do
  use HotelserverWeb, :view
  alias HotelserverWeb.BookingView

  def render("index.json", %{bookings: bookings}) do
    %{data: render_many(bookings, BookingView, "booking.json")}
  end

  def render("show.json", %{booking: booking}) do
    %{data: render_one(booking, BookingView, "booking.json")}
  end

  def render("booking.json", %{booking: booking}) do
    %{id: booking.id,
      check_in: booking.check_in,
      check_out: booking.check_out,
      status: booking.status,
      guest_id: booking.guest_id,
      room_id: booking.room_id}
  end
end
