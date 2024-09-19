# ![Pokedex](https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/master-ball.png) Pokedex-v2 [![Version](https://img.shields.io/github/v/release/mariokreitz/pokedex-v2.svg)](https://github.com/mariokreitz/pokedex-v2/releases) [![Build Status](https://github.com/mariokreitz/pokedex-v2/actions/workflows/main.yml/badge.svg)](https://github.com/mariokreitz/pokedex-v2/actions/workflows/main.yml) [![License](https://img.shields.io/github/license/mariokreitz/pokedex-v2.svg)](LICENSE)

Welcome to **Pokedex-v2**! 🎉 This project is a cutting-edge version of the classic Pokémon Pokedex, now officially released as **version 2.0.0**. It is powered by Angular 17 and the new `pokeapi-js-wrapper`, designed to provide an even more enhanced user experience with a range of exciting features.

## Demo 🎥

Check out our live demo here: [Pokedex-v2 Live Demo](https://pokedex.mario-kreitz.dev/)

## Screenshot 📸

![Pokedex Screenshot](https://raw.githubusercontent.com/mariokreitz/pokedex-v2/refs/heads/main/src/assets/screenshot.png)

## Features ✨

- **Caching**: 🗃️ Efficiently cache Pokémon data to reduce loading times and enhance performance.
- **On-Demand Data Fetching**: 📈 Retrieve more Pokémon data as needed, keeping the app responsive and up-to-date.
- **PokéStats Visualization**: 📊 Visualize Pokémon stats with interactive charts using ChartJS.
- **Detailed Pokémon Information**: 📜 Get comprehensive details such as held items, availability by edition, and more!
- **Angular 17**: 🚀 Built with the latest version of Angular for improved performance and developer experience.
- **pokeapi-js-wrapper**: 🔌 Seamlessly integrated with `pokeapi-js-wrapper` for more flexible and powerful API interactions.
- **Localization**: 🌐 Available in English (default) and German.

## Planned Features 🛠️

We are constantly working to improve **Pokedex-v2** and have some exciting features in the pipeline:

- **PokéStats Overhaul**: 📊 Revamp the chart visuals for a more interactive and insightful Pokémon stats display.
- **Secret Feature**: 🤫 Coming soon out of the Pokéball! _hihi_ Stay tuned for a fun surprise!

## 📖 **Documentation** ![Documentation](https://img.shields.io/badge/Documentation-94%25-brightgreen)

We now have detailed documentation available to help you understand and use **Pokedex-v2** effectively. You can access it here:

➡️ [**Pokedex-v2 Documentation**](https://pokedex.mario-kreitz.dev/documentation/index.html) ⬅️

The documentation page was created with [Compodoc](https://compodoc.app/).

## Getting Started Guide 📚

To get started with **Pokedex-v2**, follow these steps:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/mariokreitz/pokedex-v2.git
   ```

2. **Navigate to the Project Directory**:

   ```bash
   cd pokedex-v2
   ```

3. **Install Dependencies**:

   ```bash
   npm install
   ```

4. **Run the Application**:

   ```bash
   npm start
   ```

5. Open your browser and go to `http://localhost:4200` to start exploring!

## API Documentation 🌐

This project interacts with the [PokéAPI](https://pokeapi.co/) using the `pokeapi-js-wrapper`. Here’s a brief overview of the key methods available in this wrapper:

- **getPokemonByName(name)**: Retrieves Pokémon data by name.
- **getTypeByName(name)**: Retrieves Pokémon type data by name.
- **getAbilityByName(name)**: Retrieves Pokémon ability data by name.

For more details, check the [pokeapi-js-wrapper documentation](https://github.com/PokeAPI/pokeapi-js-wrapper) and the [PokéAPI documentation](https://pokeapi.co/docs/v2).

## Troubleshooting 🛠️

Having trouble? Here are some common issues and solutions:

- **Issue: Application not starting**  
  **Solution**: Ensure all dependencies are installed by running `npm install` and check the terminal for any error messages.

- **Issue: Data not loading**  
  **Solution**: Verify your internet connection and ensure the API service is up.

- **Issue: API request failures**  
  **Solution**: Check if the `pokeapi-js-wrapper` configuration is correct and that the API rate limits are not exceeded.

- **Issue: Changing Pokémon loading limit**  
  **Solution**: Be cautious with this setting, as the PokéAPI database may be incomplete. Adjust the limit carefully.

## Known Issues ⚠️

- **Localization**: English localization is 100% complete, while German localization is around 80% done.

## Changelog 📅

- **v2.0.0**: Official release with migration to Angular 17 and integration of `pokeapi-js-wrapper`. Added localization support and documentation.

## Acknowledgements 🙏

- **PokéAPI**: For providing comprehensive Pokémon data.
- **pokeapi-js-wrapper**: For simplifying and enhancing API interactions.
- **ChartJS**: For the powerful charting library used for data visualization.
- **Franziska**: For the stunning design of this project. 💖

## Contact 📬

For any questions or feedback, feel free to reach out:

- **Email**: [contact@mario-kreitz.dev](mailto:contact@mario-kreitz.dev)
- **GitHub Issues**: [Submit an issue](https://github.com/mariokreitz/pokedex-v2/issues)

Thank you for checking out **Pokedex-v2**! We hope you enjoy exploring Pokémon with our enhanced features. Happy coding! 😄

---

_Made with ❤️ by [Mario Kreitz](https://github.com/mariokreitz)_  
_Design by [Franziska](https://www.instagram.com/18ago/)_
