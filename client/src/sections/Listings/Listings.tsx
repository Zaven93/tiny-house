import { FC } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { List, Avatar, Button } from "antd";

import { LISTINGS } from "../../graphql/queries";
import { DELETE_LISTING } from "../../graphql/mutations";
import { Listings as ListingsType } from "../../graphql/__generated__/Listings";
import {
  DeleteListing,
  DeleteListingVariables,
} from "../../graphql/__generated__/DeleteListing";
// import {
//   Listings as ListingsType,
//   Listing,
//   DeleteListing,
//   DeleteListingVariables,
// } from "./types";
import "./styles/Listings.css";

interface ListingsPropTypes {
  title: string;
}

export const Listings: FC<ListingsPropTypes> = ({ title }) => {
  const {
    data: listingsData,
    error: listingsError,
    loading: listingsLoading,
    refetch,
  } = useQuery<ListingsType>(LISTINGS);

  const [
    deleteListing,
    { error: deleteListingError, loading: deleteListingLoading },
  ] = useMutation<DeleteListing, DeleteListingVariables>(DELETE_LISTING);

  const handleDeleteListing = (id: string) => {
    deleteListing({ variables: { id } });
    refetch();
  };

  if (listingsLoading || deleteListingLoading) return <p>Loading...</p>;
  if (listingsError || deleteListingError)
    return <p>Error occurred {listingsError}</p>;

  return (
    <div className="listings">
      <h2>{title}</h2>
      <List
        itemLayout="horizontal"
        dataSource={listingsData?.listings}
        renderItem={(listing) => (
          <List.Item
            actions={[
              <Button
                type="primary"
                onClick={() => handleDeleteListing(listing.id)}
              >
                Delete
              </Button>,
            ]}
          >
            <List.Item.Meta
              title={listing.title}
              description={listing.address}
              avatar={<Avatar src={listing.image} shape="square" size={48} />}
            />
          </List.Item>
        )}
      />
    </div>
  );
};
