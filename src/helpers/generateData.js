const { faker } = require('@faker-js/faker');
const _ = require('lodash');
const fs = require('fs');

function generateGenres() {
  const genres = ['Action', 'Comedy', 'Drama', 'Sci-Fi', 'Fantasy', 'Thriller', 'Horror'];
  return _.sampleSize(genres, _.random(1, genres.length));
}

function generateCredits(titleId) {
  const credits = ['Director', 'Producer', 'Screenwriter', 'Actor', 'Actress', 'Cinematographer', 'Film Editor', 'Production Designer', 'Costume Designer', 'Music Composer'];
  return {
    id: faker.number.int(),
    title_id: titleId,
    real_name: faker.person.fullName(),
    character_name: faker.name.firstName(),
    role: _.sample(credits),
  };
}

function generateTitle() {
  return {
    id: faker.number.int(),
    title: faker.lorem.words(),
    description: faker.lorem.sentence(),
    release_year: faker.date.past().getFullYear(),
    age_certification: _.sample(['G', 'PG', 'PG-13', 'R', 'NC-17', 'U', 'U/A', 'A', 'S', 'AL', '6', '9', '12', '12A', '15', '18', '18R', 'R18', 'R21', 'M', 'MA15+', 'R16', 'R18+', 'X18', 'T', 'E', 'E10+', 'EC', 'C', 'CA', 'GP', 'M/PG', 'TV-Y', 'TV-Y7', 'TV-G', 'TV-PG', 'TV-14', 'TV-MA']),
    runtime: _.random(60, 180),
    genres: generateGenres(),
    production_country: faker.address.countryCode(),
    seasons: faker.datatype.boolean() ? _.random(1, 10) : null,
  };
}

export function generateTestData(count) {
  const titles = [];
  const credits = [];
  for (let i = 0; i < count; i++) {
    const title = generateTitle();
    titles.push(title);
    const numCredits = _.random(1, 5);
    for (let j = 0; j < numCredits; j++) {
      credits.push(generateCredits(title.id));
    }
  }

  return { titles, credits };
}

export function saveToCSV(data, filename) {
  const csvData = data.map((item) => Object.values(item).join(',')).join('\n');
  const blob = new Blob([csvData], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
}

const testData = generateTestData(100);
saveToCSV(testData.titles, 'titles.csv');
saveToCSV(testData.credits, 'credits.csv');
