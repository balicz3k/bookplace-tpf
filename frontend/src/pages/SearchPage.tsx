import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import type { GetOffersParams } from '../models/OfferModels';
import { OfferSortBy } from '../models/OfferModels';
import OfferCard from '../components/common/OfferCard';
import SearchHeader from '../components/features/search/SearchHeader';
import type { FilterValues } from '../components/features/search/FiltersModal';
import { mockOffers } from '../mocks/offers';

const DEFAULT_PAGE_SIZE = 12;

const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [visibleCount, setVisibleCount] = React.useState(DEFAULT_PAGE_SIZE);
  const sentinelRef = React.useRef<HTMLDivElement | null>(null);
  const observerRef = React.useRef<IntersectionObserver | null>(null);
  const isIncrementingRef = React.useRef(false);

  const params: GetOffersParams = React.useMemo(() => {
    const city = searchParams.get('City');
    const checkInDate = searchParams.get('CheckInDate');
    const checkOutDate = searchParams.get('CheckOutDate');
    const guests = searchParams.get('Guests');
    const pageSize = searchParams.get('PageSize');
    const minPrice = searchParams.get('MinPrice');
    const maxPrice = searchParams.get('MaxPrice');
    const offerTypeId = searchParams.get('OfferTypeId');
    const sortBy = searchParams.get('SortBy');
    const rooms = searchParams.get('Rooms');
    const singleBeds = searchParams.get('SingleBeds');
    const doubleBeds = searchParams.get('DoubleBeds');
    const sofas = searchParams.get('Sofas');
    const bathrooms = searchParams.get('Bathrooms');

    const parsedParams: GetOffersParams = {
      PageNumber: 1,
      PageSize: pageSize ? parseInt(pageSize, 10) : DEFAULT_PAGE_SIZE,
    };

    if (city) parsedParams.City = city;
    if (checkInDate) parsedParams.CheckInDate = checkInDate;
    if (checkOutDate) parsedParams.CheckOutDate = checkOutDate;
    if (guests) parsedParams.Guests = parseInt(guests, 10);
    if (offerTypeId) parsedParams.OfferTypeId = parseInt(offerTypeId, 10);
    if (minPrice) parsedParams.MinPrice = parseFloat(minPrice);
    if (maxPrice) parsedParams.MaxPrice = parseFloat(maxPrice);

    if (sortBy) {
      const sortByValue = parseInt(sortBy, 10);
      if (
        !isNaN(sortByValue) &&
        (sortByValue === OfferSortBy.PriceAsc || sortByValue === OfferSortBy.PriceDesc)
      ) {
        parsedParams.SortBy = sortByValue as OfferSortBy;
      }
    }

    if (rooms) parsedParams.Rooms = parseInt(rooms, 10);
    if (singleBeds) parsedParams.SingleBeds = parseInt(singleBeds, 10);
    if (doubleBeds) parsedParams.DoubleBeds = parseInt(doubleBeds, 10);
    if (sofas) parsedParams.Sofas = parseInt(sofas, 10);
    if (bathrooms) parsedParams.Bathrooms = parseInt(bathrooms, 10);

    const amenities = searchParams.getAll('Amenities');
    if (amenities.length > 0) {
      const parsedAmenities = amenities
        .map((id) => parseInt(id, 10))
        .filter((id) => !isNaN(id) && id > 0);

      if (parsedAmenities.length > 0) {
        parsedParams.Amenities = parsedAmenities;
      }
    }

    return parsedParams;
  }, [searchParams]);

  React.useEffect(() => {
    setVisibleCount(params.PageSize || DEFAULT_PAGE_SIZE);
  }, [
    params.PageSize,
    params.City,
    params.MinPrice,
    params.MaxPrice,
    params.OfferTypeId,
    params.SortBy,
    params.Rooms,
    params.SingleBeds,
    params.DoubleBeds,
    params.Sofas,
    params.Bathrooms,
    params.Amenities,
    params.Guests,
  ]);

  React.useEffect(() => {
    isIncrementingRef.current = false;
  }, [visibleCount]);

  const filteredOffers = React.useMemo(() => {
    let list = [...mockOffers];

    if (params.City) {
      const cityLower = params.City.toLowerCase();
      list = list.filter((offer) => offer.addressCity.toLowerCase().includes(cityLower));
    }

    if (params.MinPrice !== undefined) {
      list = list.filter((offer) => offer.pricePerNight >= params.MinPrice!);
    }

    if (params.MaxPrice !== undefined) {
      list = list.filter((offer) => offer.pricePerNight <= params.MaxPrice!);
    }

    if (params.Guests !== undefined) {
      list = list.filter((offer) => offer.maxGuests >= params.Guests!);
    }

    if (params.OfferTypeId !== undefined) {
      list = list.filter((offer) => offer.offerType.id === params.OfferTypeId);
    }

    if (params.Rooms !== undefined) {
      list = list.filter((offer) => offer.rooms >= params.Rooms!);
    }

    if (params.SingleBeds !== undefined) {
      list = list.filter((offer) => offer.singleBeds >= params.SingleBeds!);
    }

    if (params.DoubleBeds !== undefined) {
      list = list.filter((offer) => offer.doubleBeds >= params.DoubleBeds!);
    }

    if (params.Sofas !== undefined) {
      list = list.filter((offer) => offer.sofas >= params.Sofas!);
    }

    if (params.Bathrooms !== undefined) {
      list = list.filter((offer) => offer.bathrooms >= params.Bathrooms!);
    }

    if (params.Amenities && params.Amenities.length > 0) {
      list = list.filter((offer) =>
        params.Amenities!.every((id) => offer.amenities.some((amenity) => amenity.id === id)),
      );
    }

    if (params.SortBy === OfferSortBy.PriceAsc) {
      list.sort((a, b) => a.pricePerNight - b.pricePerNight);
    } else if (params.SortBy === OfferSortBy.PriceDesc) {
      list.sort((a, b) => b.pricePerNight - a.pricePerNight);
    }

    return list;
  }, [params]);

  const currentSortBy = params.SortBy;
  const currentCity = params.City;

  const currentFilters: FilterValues = React.useMemo(
    () => ({
      minPrice: params.MinPrice,
      maxPrice: params.MaxPrice,
      rooms: params.Rooms,
      singleBeds: params.SingleBeds,
      doubleBeds: params.DoubleBeds,
      sofas: params.Sofas,
      bathrooms: params.Bathrooms,
      amenities: params.Amenities,
    }),
    [params],
  );

  const handleSortChange = (newSortBy: OfferSortBy | undefined) => {
    const newParams = new URLSearchParams(searchParams);
    if (newSortBy === undefined) {
      newParams.delete('SortBy');
    } else {
      newParams.set('SortBy', newSortBy.toString());
    }
    setSearchParams(newParams);
  };

  const handleFiltersChange = (filters: FilterValues) => {
    const newParams = new URLSearchParams(searchParams);
    ['MinPrice', 'MaxPrice', 'Rooms', 'SingleBeds', 'DoubleBeds', 'Sofas', 'Bathrooms', 'Amenities']
      .forEach((key) => newParams.delete(key));

    if (filters.minPrice !== undefined) newParams.set('MinPrice', filters.minPrice.toString());
    if (filters.maxPrice !== undefined) newParams.set('MaxPrice', filters.maxPrice.toString());
    if (filters.rooms !== undefined) newParams.set('Rooms', filters.rooms.toString());
    if (filters.singleBeds !== undefined) newParams.set('SingleBeds', filters.singleBeds.toString());
    if (filters.doubleBeds !== undefined) newParams.set('DoubleBeds', filters.doubleBeds.toString());
    if (filters.sofas !== undefined) newParams.set('Sofas', filters.sofas.toString());
    if (filters.bathrooms !== undefined) newParams.set('Bathrooms', filters.bathrooms.toString());

    if (filters.amenities && filters.amenities.length > 0) {
      filters.amenities.forEach((amenityId) => {
        newParams.append('Amenities', amenityId.toString());
      });
    }

    setSearchParams(newParams);
  };

  const totalItemsCount = filteredOffers.length;
  const canLoadMore = totalItemsCount > 0;
  const visibleOffers = React.useMemo(() => {
    if (!canLoadMore) return [];

    return filteredOffers.slice(0, visibleCount);
  }, [filteredOffers, totalItemsCount, visibleCount, canLoadMore]);

  React.useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;

    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;
        if (!canLoadMore) return;
        if (isIncrementingRef.current) return;

        isIncrementingRef.current = true;
        setVisibleCount((count) => count + (params.PageSize || DEFAULT_PAGE_SIZE));
      },
      { rootMargin: '200px 0px', threshold: 0 },
    );

    observerRef.current.observe(node);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [canLoadMore, params.PageSize]);

  return (
    <Box>
      <Box sx={{ width: '100%' }}>
        <SearchHeader
          totalCount={totalItemsCount}
          city={currentCity}
          sortBy={currentSortBy}
          onSortChange={handleSortChange}
          onFiltersChange={handleFiltersChange}
          activeFilters={currentFilters}
        />

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 3,
            justifyContent: 'center',
          }}
        >
          {visibleOffers.map((offer, index) => (
            <Box
              key={`${offer.id}-${index}`}
              sx={{
                flex: '1 1 calc(25% - 24px)',
                minWidth: '300px',
                maxWidth: '400px',
              }}
            >
              <OfferCard
                offer={offer}
                checkInDate={params.CheckInDate}
                checkOutDate={params.CheckOutDate}
                guests={params.Guests}
              />
            </Box>
          ))}
        </Box>

        <Box ref={sentinelRef} sx={{ height: 1 }} />

        {totalItemsCount === 0 && (
          <Box sx={{ textAlign: 'center', my: 4, color: 'text.secondary' }}>
            <Typography variant="body2">No offers match the selected filters.</Typography>
          </Box>
        )}

      </Box>
    </Box>
  );
};

export default SearchPage;

