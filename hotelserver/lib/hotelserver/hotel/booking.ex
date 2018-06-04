defmodule Hotelserver.Hotel.Booking do
  use Ecto.Schema
  import Ecto.Changeset


  schema "bookings" do
    field :check_in, :utc_datetime
    field :check_out, :utc_datetime
    field :guest_id, :integer
    field :room_id, :integer
    field :status, :string

    timestamps()
  end

  @doc false
  def changeset(booking, attrs) do
    booking
    |> cast(attrs, [:check_in, :check_out, :status, :guest_id, :room_id])
    |> validate_required([:check_in, :check_out, :status, :guest_id, :room_id])
  end
end
