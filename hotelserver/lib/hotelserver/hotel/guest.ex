defmodule Hotelserver.Hotel.Guest do
  use Ecto.Schema
  import Ecto.Changeset


  schema "guests" do
    field :name, :string

    timestamps()
  end

  @doc false
  def changeset(guest, attrs) do
    guest
    |> cast(attrs, [:name])
    |> validate_required([:name])
  end
end
