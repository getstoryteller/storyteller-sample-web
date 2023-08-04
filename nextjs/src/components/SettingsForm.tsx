import React, { SyntheticEvent, useState } from 'react';
import Storyteller from '@getstoryteller/storyteller-sdk-javascript';
import { useRouter } from 'next/router';

enum Settings {
  language = 'language',
  favoriteTeam = 'favoriteTeam',
}

const NBA_TEAMS: Record<string, string> = {
  ATL: 'Atlanta Hawks',
  BOS: 'Boston Celtics',
  BKN: 'Brooklyn Nets',
  CHA: 'Charlotte Hornets',
  CHI: 'Chicago Bulls',
  CLE: 'Cleveland Cavaliers',
  DAL: 'Dallas Mavericks',
  DEN: 'Denver Nuggets',
  DET: 'Detroit Pistons',
  GSW: 'Golden State Warriors',
  HOU: 'Houston Rockets',
  IND: 'Indiana Pacers',
  LAC: 'LA Clippers',
  LAL: 'Los Angeles Lakers',
  MEM: 'Memphis Grizzlies',
  MIA: 'Miami Heat',
  MIL: 'Milwaukee Bucks',
  MIN: 'Minnesota Timberwolves',
  NOP: 'New Orleans Pelicans',
  NYK: 'New York Knicks',
  OKC: 'Oklahoma City Thunder',
  ORL: 'Orlando Magic',
  PHI: 'Philadelphia 76ers',
  PHX: 'Phoenix Suns',
  POR: 'Portland Trail Blazers',
  SAC: 'Sacramento Kings',
  SAS: 'San Antonio Spurs',
  TOR: 'Toronto Raptors',
  UTA: 'Utah Jazz',
  WAS: 'Washington Wizards',
};

const DELAY_AFTER_SAVE = 300;

interface FormElements {
  language: HTMLSelectElement;
  team: HTMLSelectElement;
}

// This form allows the user to set their language and favorite NBA team.
// These user attributes are then passed to the Storyteller SDK and used
// both to target and personalize content to the user.
//
// To learn more about user attributes, see:
// https://www.getstoryteller.com/documentation/web/users
//
// To learn more about targeting and personalization, see:
// https://www.getstoryteller.com/user-guide/stories-and-scheduling/audience-targeting
// https://www.getstoryteller.com/user-guide/stories-and-scheduling/personalization

const SettingsForm = () => {
  const [alertVisible, setAlertVisible] = React.useState(false);
  const defaultLanguage =
    Storyteller.User.getUserAttribute(Settings.language) || 'EN';
  const defaultTeam = Storyteller.User.getUserAttribute(Settings.favoriteTeam);
  const router = useRouter();

  const setLocalSetting = (key: string, value: string) => {
    Storyteller.User.setUserAttribute(key, value);
  };

  const handleSubmit = (
    event: SyntheticEvent<HTMLFormElement, SubmitEvent>,
  ): void => {
    event.preventDefault();
    const { language, team } = event.currentTarget
      .elements as unknown as FormElements;
    if (language.value) {
      setLocalSetting(Settings.language, language.value);
    }
    if (team.value) {
      setLocalSetting(Settings.favoriteTeam, team.value);
    }
    setAlertVisible(true);
    setTimeout(() => {
      router.push('/');
    }, DELAY_AFTER_SAVE);
  };

  return (
    <form action="POST" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold leading-7 sm:truncate sm:text-3xl sm:tracking-tight  mt-20">
        Choose your language
      </h2>
      <select
        name="language"
        className="mt-4 p-2"
        defaultValue={defaultLanguage}
      >
        <option value="EN">English</option>
        <option value="FR">French</option>
        <option value="ES">Spanish</option>
        <option value="JA">Japanese</option>
      </select>
      <h2 className="text-2xl font-bold leading-7 sm:truncate sm:text-3xl sm:tracking-tight mt-20">
        Choose your NBA team
      </h2>
      <select name="team" className="mt-4 p-2" defaultValue={defaultTeam || ''}>
        <option value="" disabled>
          Select your option
        </option>
        {Object.keys(NBA_TEAMS).map((key) => (
          <option key={key} value={key}>
            {NBA_TEAMS[key]}
          </option>
        ))}
      </select>
      <h2
        className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight mt-20"
        style={{
          color: 'rgb(0 181 0)',
          transition: 'all 0.3s ease-in-out',
          opacity: alertVisible ? 1 : 0,
        }}
      >
        ✅ Saved!
      </h2>
      <button
        type="submit"
        className="mt-10 flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Save changes
      </button>
    </form>
  );
};

export default SettingsForm;
