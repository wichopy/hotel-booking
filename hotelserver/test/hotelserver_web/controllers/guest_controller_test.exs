defmodule HotelserverWeb.GuestControllerTest do
  use HotelserverWeb.ConnCase

  alias Hotelserver.Hotel
  alias Hotelserver.Hotel.Guest

  @create_attrs %{name: "some name"}
  @update_attrs %{name: "some updated name"}
  @invalid_attrs %{name: nil}

  def fixture(:guest) do
    {:ok, guest} = Hotel.create_guest(@create_attrs)
    guest
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all guests", %{conn: conn} do
      conn = get conn, guest_path(conn, :index)
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create guest" do
    test "renders guest when data is valid", %{conn: conn} do
      conn = post conn, guest_path(conn, :create), guest: @create_attrs
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get conn, guest_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "name" => "some name"}
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post conn, guest_path(conn, :create), guest: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update guest" do
    setup [:create_guest]

    test "renders guest when data is valid", %{conn: conn, guest: %Guest{id: id} = guest} do
      conn = put conn, guest_path(conn, :update, guest), guest: @update_attrs
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get conn, guest_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "name" => "some updated name"}
    end

    test "renders errors when data is invalid", %{conn: conn, guest: guest} do
      conn = put conn, guest_path(conn, :update, guest), guest: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete guest" do
    setup [:create_guest]

    test "deletes chosen guest", %{conn: conn, guest: guest} do
      conn = delete conn, guest_path(conn, :delete, guest)
      assert response(conn, 204)
      assert_error_sent 404, fn ->
        get conn, guest_path(conn, :show, guest)
      end
    end
  end

  defp create_guest(_) do
    guest = fixture(:guest)
    {:ok, guest: guest}
  end
end
