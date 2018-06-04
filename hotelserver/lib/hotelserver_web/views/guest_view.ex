defmodule HotelserverWeb.GuestView do
  use HotelserverWeb, :view
  alias HotelserverWeb.GuestView

  def render("index.json", %{guests: guests}) do
    %{data: render_many(guests, GuestView, "guest.json")}
  end

  def render("show.json", %{guest: guest}) do
    %{data: render_one(guest, GuestView, "guest.json")}
  end

  def render("guest.json", %{guest: guest}) do
    %{id: guest.id,
      name: guest.name}
  end
end
