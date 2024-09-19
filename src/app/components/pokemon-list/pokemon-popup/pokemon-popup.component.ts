import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Pokemon } from '../../../../types/pokedex';
import { DecimalPipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import Chart from 'chart.js/auto';
import { SettingsService } from '../../../services/settings.service';
import { PokemonService } from '../../../services/pokemon.service';

/**
 * Displays a popup with information about a Pokémon.
 *
 * @param {Pokemon} selectedPokemon - The Pokémon to display.
 */
@Component({
  selector: 'app-pokemon-popup',
  standalone: true,
  imports: [UpperCasePipe, TitleCasePipe, DecimalPipe],
  templateUrl: './pokemon-popup.component.html',
  styleUrl: './pokemon-popup.component.scss',
})
export class PokemonPopupComponent implements OnInit {
  /**
   * The Pokémon to display.
   */
  @Input() selectedPokemon: Pokemon | null = null;

  /**
   * The conversion factor from decimeter to centimeters.
   */
  private readonly CM = 10;

  /**
   * The conversion factor from hectograms to kilograms.
   */
  private readonly HECTOGRAM = 100;

  /**
   * The audio volume to use for the Pokémon's cries.
   */
  private audioVolume = 0.25;

  /**
   * Whether the Pokémon's cry is currently playing.
   */
  private isAudioPlaying = false;

  /**
   * Returns the current language setting.
   *
   * @return {string} The current language setting.
   */
  get language(): string {
    return this.settingsService.getLanguage();
  }

  /**
   * The ID of the Pokémon.
   */
  id!: number;

  /**
   * The name of the Pokémon.
   */
  name!: string;

  /**
   * The names of the Pokémon in different languages.
   *
   * @remarks
   * The names are an array of objects containing the name of the Pokémon in a specific language and the URL of the language resource.
   *
   * @property {string} name - The name of the Pokémon in the specific language.
   * @property {{name: string; url: string}} language - The language resource.
   */
  names!: {
    name: string;
    language: {
      name: string;
      url: string;
    };
  }[];

  /**
   * Returns the name of the Pokémon in the selected language.
   *
   * If the Pokémon has a name in the selected language, that name is returned.
   * Otherwise, the Pokémon's default name is returned.
   *
   * @return {string} The name of the Pokémon in the selected language, or the default name if no translation is available.
   */
  get getSelectedLanguageName(): string {
    if (!this.names) return this.name;

    const selectedLanguageName = this.names.find(
      (name) => name.language.name === this.settingsService.getLanguage()
    )?.name;

    return selectedLanguageName || this.name;
  }

  /**
   * Returns the description of the Pokémon in the selected language.
   *
   * @return {string} The description of the Pokémon in the selected language, or an empty string if no description is available.
   */
  get getSelectedLanguageDescription(): string {
    if (!this.flavor_text_entries) return '';
    const filteredDescriptions = this.flavor_text_entries.filter(
      ({ language }) => language.name === this.settingsService.getLanguage()
    );
    return filteredDescriptions[0].flavor_text.replace('\f', '\n') || '';
  }

  /**
   * The Pokémon's HP number.
   */
  hp_number!: number;

  /**
   * The Pokémon's HP text.
   */
  hp_text!: string;

  /**
   * The URL of the Pokémon's image, or null if no image is available.
   */
  imgSrc!: string | null;

  /**
   * The types of the Pokémon.
   *
   * @remarks
   * The types are an array of objects containing the English and German names of the types.
   *
   * @property {string} english - The English name of the type.
   * @property {string} german - The German name of the type.
   */
  types!: {
    english: string;
    german: string;
  }[];

  /**
   * The stats of the Pokémon.
   *
   * @remarks
   * The stats are an array of objects containing the base stat, effort, and
   * stat name and URL of the Pokémon.
   *
   * @property {number} base_stat - The base stat of the Pokémon.
   * @property {number} effort - The effort of the Pokémon.
   * @property {Object} stat - The stat of the Pokémon.
   * @property {string} stat.name - The name of the stat.
   * @property {string} stat.url - The URL of the stat.
   */
  stats!: {
    base_stat: number;
    effort: number;
    stat: { name: string; url: string };
  }[];

  /**
   * The cries of the Pokémon.
   *
   * @remarks
   * The cries are an object containing the latest and legacy cries of the
   * Pokémon.
   *
   * @property {string} latest - The latest cry of the Pokémon.
   * @property {string} legacy - The legacy cry of the Pokémon.
   */
  cries?: {
    latest: string;
    legacy: string;
  };

  /**
   * The Pokémon's height in meters.
   */
  height!: number;

  /**
   * The Pokémon's weight in kilograms.
   */
  weight!: number;

  /**
   * The items that the Pokémon can hold.
   *
   * @remarks
   * Each held item is an object containing the item itself and an array of
   * version details.
   *
   * @property {Object} item - The item that the Pokémon can hold.
   * @property {string} item.name - The name of the item.
   * @property {string} item.url - The URL of the item.
   *
   * @property {Object[]} version_details - An array of version details.
   * @property {number} version_details.rarity - The rarity of the item in the
   * version.
   */
  held_items!: {
    item: { name: string; url: string };
    version_details: {
      rarity: number;
    }[];
  }[];

  /**
   * The flavor text entries of the Pokémon.
   *
   * @remarks
   * Each flavor text entry is an object containing the flavor text itself, a
   * language object, and a version object.
   *
   * @property {string} flavor_text - The flavor text of the Pokémon.
   *
   * @property {Object} language - The language of the flavor text.
   * @property {string} language.name - The name of the language.
   * @property {string} language.url - The URL of the language.
   *
   * @property {Object} version - The version of the flavor text.
   * @property {string} version.name - The name of the version.
   * @property {string} version.url - The URL of the version.
   */
  flavor_text_entries!: {
    flavor_text: string;
    language: {
      name: string;
      url: string;
    };
    version: {
      name: string;
      url: string;
    };
  }[];

  /**
   * The game indices of the Pokémon.
   *
   * @remarks
   * Each game index is an object containing the game index itself, and a version object.
   *
   * @property {number} game_index - The game index of the Pokémon.
   *
   * @property {Object} version - The version of the game index.
   * @property {string} version.name - The name of the version.
   * @property {string} version.url - The URL of the version.
   */
  game_indices!: {
    game_index: number;
    version: { name: string; url: string };
  }[];

  /**
   * The items of the Pokémon.
   *
   * @remarks
   * Each item is an object containing the name of the item, and a sprites object.
   *
   * @property {string} name - The name of the item.
   *
   * @property {Object} sprites - The sprites of the item.
   * @property {string | null} sprites.default - The default sprite of the item.
   */
  items?: {
    name: string;
    sprites: {
      default: string | null;
    };
  }[];

  /**
   * The abilities of the Pokémon.
   *
   * @remarks
   * Each ability is an object containing the ability object, whether it is hidden, and the slot of the ability.
   *
   * @property {Object} ability - The ability object.
   * @property {string} ability.name - The name of the ability.
   * @property {string} ability.url - The URL of the ability.
   *
   * @property {boolean} is_hidden - Whether the ability is hidden.
   *
   * @property {number} slot - The slot of the ability.
   */
  abilities!: {
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }[];
  /**
   * Creates an instance of the PokemonPopupComponent.
   *
   * @param {SettingsService} settingsService - The settings service that provides the necessary data for this component.
   * @param {PokemonService} pokemonService - The Pokémon service that provides the necessary data for this component.
   */
  constructor(
    private settingsService: SettingsService,
    private pokemonService: PokemonService
  ) {}

  /**
   * Initializes the component by subscribing to the current audio volume.
   *
   * @return {void} No return value.
   */
  ngOnInit(): void {
    this.settingsService.currentAudioVolume.subscribe((volume) => {
      this.audioVolume = volume;
    });
  }

  /**
   *  Handles changes to the component's input properties.
   *
   *  @param {SimpleChanges} changes - An object containing the changes to the input properties.
   *  @return {void} No return value.
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedPokemon'] && this.selectedPokemon) {
      this.updatePokemonData();
      this.createStatsChart();
      this.addDynamicBackground();
      this.resetTabDisplay();
    }
  }

  /**
   * Updates the component's data with the selected Pokémon's information.
   *
   * This function extracts the necessary data from the selected Pokémon object
   * and updates the component's properties accordingly.
   *
   * @return {void} No return value.
   */
  private updatePokemonData(): void {
    const {
      name,
      names,
      abilities,
      flavor_text_entries,
      game_indices,
      height,
      held_items,
      id,
      sprites,
      stats,
      types,
      weight,
      cries,
      items,
    } = this.selectedPokemon as Pokemon;

    this.id = id;
    this.name = name;
    this.names = names;
    this.flavor_text_entries = flavor_text_entries;
    this.imgSrc =
      sprites.other.dream_world.front_default ??
      sprites.other['official-artwork'].front_default;
    this.types = types
      .map(({ type }) => type.name)
      .map((type) => this.pokemonService.getTypeName(type));
    this.cries = cries;
    this.stats = stats;
    this.hp_number = stats[0].base_stat;
    this.hp_text = stats[0].stat.name;
    this.height = (height * this.CM) / 100;
    this.weight = (weight * this.HECTOGRAM) / 1000;
    this.game_indices = game_indices;
    this.held_items = held_items;
    this.items = Array.isArray(items) ? items : [];
    this.abilities = abilities;
  }

  /**
   * Dynamically adds a background class to the overview card element.
   *
   * @return {void} No return value.
   */
  private addDynamicBackground(): void {
    const overviewCard = document.getElementById('overview-card');

    if (overviewCard) {
      overviewCard.className = 'overview-card';
      overviewCard.classList.add('type', this.types[0].english);
    }
  }

  /**
   * Plays the cry of a Pokémon.
   *
   * If the cry audio URL is available, it creates a new Audio object, sets the volume,
   * and plays the audio. It also adds an event listener to stop the audio when it ends.
   * If the audio URL is not available, it displays an alert message.
   *
   * @return {void}
   */
  playCry(): void {
    const { latest, legacy } = this.cries || {};
    const audioUrl = latest || legacy;

    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.volume = this.audioVolume;
      if (!this.isAudioPlaying) {
        this.isAudioPlaying = true;
        audio.play();
      }
      audio.addEventListener('ended', () => {
        this.isAudioPlaying = false;
      });
    } else {
      alert('Cry not found');
    }
  }

  /**
   *  Closes the popup by hiding the overview element and re-enabling body scrolling.
   *
   *  @return {void} No return value.
   */
  closePopup(): void {
    const overview = document.getElementById('overview') as HTMLDivElement;
    if (overview) {
      overview.classList.add('d_none');
    }
    document.body.classList.remove('no-scroll');
  }

  /**
   * Creates a radar chart displaying the base stats of a Pokémon.
   *
   * @return {void} This function does not return anything.
   */
  private createStatsChart(): void {
    const ctx = this.getCanvasElement('chart');

    const labels = this.getStatLabels();
    const data = this.stats.map((stat) => stat.base_stat);

    const chart = Chart.getChart(ctx);
    if (chart) {
      chart.destroy();
    }

    new Chart(ctx, {
      type: 'radar',
      data: { labels, datasets: [{ label: 'Stats', data }] },
      options: {
        scales: {
          r: {
            ticks: { display: false, stepSize: 20 },
            pointLabels: { color: 'white' },
            angleLines: { display: true, color: 'rgba(255, 255, 255, 0.75)' },
            grid: { color: 'rgba(255, 255, 255, 0.75)' },
            suggestedMin: 0,
            suggestedMax: 120,
          },
        },
        plugins: {
          legend: { display: false },
        },
      },
    });
  }

  /**
   * Returns an array of stat labels based on the selected language.
   *
   * @return {string[]} An array of stat labels.
   */
  private getStatLabels(): string[] {
    const labels = ['HP', 'Attack', 'Defense', 'Sp. Atk', 'Sp. Def', 'Speed'];
    if (this.settingsService.getLanguage() === 'de') {
      labels[0] = 'HP';
      labels[1] = 'Angriff';
      labels[2] = 'Verteid.';
      labels[3] = 'SP. Angr.';
      labels[4] = 'SP. Verteid.';
      labels[5] = 'Initiative';
    }
    return labels;
  }

  /**
   * Returns the HTMLCanvasElement with the given id from the document.
   *
   * @param {string} id - The id of the canvas element to retrieve.
   * @return {HTMLCanvasElement} The HTMLCanvasElement with the given id.
   */
  private getCanvasElement(id: string): HTMLCanvasElement {
    return document.getElementById(id) as HTMLCanvasElement;
  }

  /**
   * Opens a tab based on the provided tab name and updates the active tab links.
   *
   * @param {Event} event - The event that triggered the tab opening.
   * @param {string} tabName - The name of the tab to be opened.
   * @return {void}
   */
  openTab(event: Event, tabName: string): void {
    const tabContents =
      document.querySelectorAll<HTMLDivElement>('.tabcontent');

    tabContents.forEach((tabContent) => {
      tabContent.style.display = 'none';
    });

    const tabs = document.querySelectorAll<HTMLImageElement>('.tablinks');

    tabs.forEach((tab) => tab.classList.remove('active'));

    const selectedTab = document.getElementById(tabName);

    if (selectedTab) {
      selectedTab.style.display = 'block';

      if (event.currentTarget) {
        (event.currentTarget as HTMLImageElement).classList.add('active');
      }
    }
  }

  /**
   * Resets the display of tab contents based on their IDs.
   *
   * @return {void} This function does not return a value.
   */
  resetTabDisplay(): void {
    const tabContents = document.querySelectorAll<HTMLElement>('.tabcontent');

    tabContents.forEach((tabContent) => {
      tabContent.style.display =
        tabContent.id === 'stats-Chart' ? 'block' : 'none';
    });
  }
}
