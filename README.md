# fullstackopen

Solution repo for https://fullstackopen.com/

---

## Part 1

### courseinfo

```bash
cd part1/courseinfo && npm install && npm run start
```

### unicafe

```bash
cd part1/unicafe && npm install && npm run start
```

### anecdotes

```bash
cd part1/anecdotes && npm install && npm run start
```

---

## Part 2

### courseinfo

```bash
cd part2/courseinfo && npm install && npm run start
```

### phonebook

Has a developer depencecy on json-server. Add `"server": "json-server -p3001 db.json"` to `package.json` scripts and run

```bash
npm install && npm install json-server --save-dev && npm run server
npm run start
```

### countries

Create an .env file with the following content `REACT_APP_WEATHER_API_KEY=<YOUR_API_KEY>` then run

```bash
npm install && npm run start
```
