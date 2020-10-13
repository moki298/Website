import React, {FC, ReactNode, useCallback, useEffect, useMemo, useState} from 'react';
import {useParams} from 'react-router-dom';

import {BreadcrumbMenu, EmptyPage, FlatNavLinks} from 'components';
import {useScrollToTopContainer} from 'hooks';
import {Opening} from 'types/thenewboston';
import {OpeningsUrlParams, OpeningTeam} from 'types/openings';
import {fetchOpenings} from 'utils/thenewboston';

import OpeningDetails from './OpeningDetails';
import OpeningsOpening from './OpeningsOpening';
import './Openings.scss';

const OPENING_CATEGORY_FILTERS = [
  OpeningTeam.all,
  OpeningTeam.accounting,
  OpeningTeam.community,
  OpeningTeam.design,
  OpeningTeam.engineering,
  OpeningTeam.marketing,
];

const Openings: FC = () => {
  const {openingId: openingIdParam} = useParams<OpeningsUrlParams>();
  const [categoryFilter, setCategoryFilter] = useState<OpeningTeam>(OpeningTeam.all);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [openings, setOpenings] = useState<Opening[]>([]);
  const openingDetailsContainer = useScrollToTopContainer<HTMLDivElement>([openingIdParam]);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const results = await fetchOpenings();
        setOpenings(results);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredOpenings = useMemo(
    () => (categoryFilter === OpeningTeam.all ? openings : openings.filter(({team}) => team === categoryFilter)),
    [categoryFilter, openings],
  );

  const opening = useMemo(() => openings.find(({pk}) => pk === openingIdParam) || null, [openingIdParam, openings]);

  const handleNavOptionClick = useCallback(
    (option: OpeningTeam) => (): void => {
      setCategoryFilter(option);
    },
    [setCategoryFilter],
  );

  const renderCategoryFilter = (): ReactNode => {
    return (
      <FlatNavLinks<OpeningTeam>
        handleOptionClick={handleNavOptionClick}
        options={OPENING_CATEGORY_FILTERS}
        selectedOption={categoryFilter}
      />
    );
  };

  const renderOpenings = (): ReactNode => {
    if (!filteredOpenings.length) return <EmptyPage />;
    return filteredOpenings.map(({description, pk, title}) => (
      <OpeningsOpening description={description} key={pk} pk={pk} title={title} />
    ));
  };

  const renderOpeningDetails = (): ReactNode => {
    if (!opening) return <EmptyPage />;
    return <OpeningDetails opening={opening} />;
  };

  return (
    <div className="Openings">
      <BreadcrumbMenu
        className="Openings__BreadcrumbMenu"
        menuItems={renderCategoryFilter()}
        pageName={categoryFilter}
        sectionName="Open Positions"
      />
      <div className="Openings__left-menu">{renderCategoryFilter()}</div>
      {openingIdParam ? (
        <div className="Openings__opening-details" ref={openingDetailsContainer}>
          {renderOpeningDetails()}
        </div>
      ) : (
        <div className="Openings__opening-list">
          <h1 className="Openings__opening-list-heading">Openings</h1>
          {renderOpenings()}
        </div>
      )}
    </div>
  );
};

export default Openings;
