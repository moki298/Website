import React, {ReactNode, useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';

import {REPOSITORY_FILTERS} from 'constants/github';

import {BreadcrumbMenu, EmptyPage, FlatNavLinks, Loader, TimeFilter} from 'components';
import {Repository, RepositoryUrlParams, Time, TimeFilterType} from 'types/github';
import {Contributor} from 'types/thenewboston';
import {fetchContributors} from 'utils/thenewboston';

import LeaderboardContributor from './LeaderboardContributor';
import './Leaderboard.scss';

const timeFilterMap = {
  [Time.days7]: 7,
  [Time.days30]: 30,
  [Time.all]: null,
};

const Leaderboard = () => {
  const history = useHistory();
  const {repository} = useParams<RepositoryUrlParams>();
  const [repositoryFilter, setRepositoryFilter] = useState<Repository>(repository);
  const [timeFilter, setTimeFilter] = useState<TimeFilterType>(Time.all);
  const [error, setError] = useState<boolean>(false);
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const results = await fetchContributors();
        setContributors(results);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setRepositoryFilter(repository);
  }, [repository]);

  const handleNavOptionClick = (option: Repository) => (): void => {
    history.push(`/leaderboard/${option}`);
  };

  const renderContributors = () => {
    if (error || !contributors.length) return <EmptyPage />;
    return contributors.map(({account_number, github_username, pk, profile_image}, index) => (
      <LeaderboardContributor
        account_number={account_number}
        github_avatar_url={profile_image}
        github_username={github_username}
        key={pk}
        rank={index + 1}
        tasks={[]}
        total_earnings={1}
      />
    ));
  };

  const renderNavLinks = (): ReactNode => {
    return (
      <FlatNavLinks<Repository>
        handleOptionClick={handleNavOptionClick}
        options={REPOSITORY_FILTERS}
        selectedOption={repository}
      />
    );
  };

  const renderTopSections = () => (
    <>
      <BreadcrumbMenu
        className="Leaderboard__BreadcrumbMenu"
        menuItems={renderNavLinks()}
        pageName={repository}
        sectionName="Leaderboard"
      />
      <TimeFilter className="Leaderboard__TimeFilter" selectedFilter={timeFilter} setSelectedFilter={setTimeFilter} />
    </>
  );

  return (
    <>
      <div className="Leaderboard">
        {renderTopSections()}
        <div className="Leaderboard__left-menu">{renderNavLinks()}</div>
        <div className="Leaderboard__contributor-list">
          {loading ? <Loader className="Leaderboard__Loader" /> : renderContributors()}
        </div>
      </div>
    </>
  );
};

export default Leaderboard;
