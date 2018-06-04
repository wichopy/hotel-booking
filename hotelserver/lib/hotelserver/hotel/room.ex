defmodule Hotelserver.Hotel.Room do
  use Ecto.Schema
  import Ecto.Changeset


  schema "rooms" do
    field :number, :integer

    timestamps()
  end

  @doc false
  def changeset(room, attrs) do
    room
    |> cast(attrs, [:number])
    |> validate_required([:number])
  end
end
