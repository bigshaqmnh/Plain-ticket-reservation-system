import React from 'react';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import LocationIcon from '@material-ui/icons/LocationOn';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import { IAirportData, IAirport } from '../../interface';

import { parseCountry, parseCity } from '../../../../helpers/parseLocation';

interface IProps {
  isLoading: boolean;
  airports: IAirportData;
  inputValue: string;
  isShown: boolean;
  handleChange: (value: string) => void;
}

interface IState {
  showAutocomplete: boolean;
  expendedItem: string;
}

const parseLocation = (airport: IAirport) => `${airport.country}, ${airport.city}`;

class AutocompleteList extends React.PureComponent<IProps, IState> {
  private component: React.RefObject<any> = React.createRef();

  constructor(props: IProps) {
    super(props);
    this.state = {
      showAutocomplete: true,
      expendedItem: null
    };
  }

  private handleOutsideClick = (event: MouseEvent) => {
    const { current } = this.component;

    if (current
      &&
      !current.contains(event.target)
    ) {
      this.setState({
        showAutocomplete: false
      });
    }
  };

  public componentDidMount(): void {
    document.addEventListener('click', this.handleOutsideClick);
  }

  public componentWillUnmount(): void {
    document.removeEventListener('click', this.handleOutsideClick);
  }

  public componentDidUpdate(prevProps: Readonly<IProps>): void {
    const { inputValue: nextInput, airports, handleChange } = this.props;
    const { inputValue: prevInput } = prevProps;
    const countryReg: RegExp = new RegExp(parseCountry(nextInput), 'ig');
    const cityReg: RegExp = new RegExp(parseCity(nextInput), 'ig');
    let expendedItem = '';
    let prediction = '';

    if (nextInput.length > prevInput.length) {
      outerLoop: for (const country in airports) {
        if (!countryReg.test(country)) {
          continue;
        }

        expendedItem = country;
        prediction = parseLocation(airports[country][0]);

        for (const airport of airports[country]) {
          if (cityReg.test(airport.city)) {
            prediction = parseLocation(airport);

            break outerLoop;
          }
        }
      }

      handleChange(prediction);

      this.setState({
        showAutocomplete: true,
        expendedItem
      });
    }
  }

  private handleCountryClick = (country: string) => {
    this.props.handleChange(`${country}, `);

    this.setState({
      showAutocomplete: true,
      expendedItem: country
    });
  };

  private handleCityClick = (event, airport) => {
    this.props.handleChange(parseLocation(airport));

    this.setState({
      showAutocomplete: false,
      expendedItem: null
    });

    event.stopPropagation();
  };

  public render(): JSX.Element {
    const { isLoading, airports, inputValue } = this.props;
    const { expendedItem } = this.state;
    const isShown = !isLoading && this.state.showAutocomplete;
    // console.log('state: ', this.state);

    const countries: string[] = Object.keys(airports);
    const countryReg: RegExp = new RegExp(parseCountry(inputValue), 'ig');
    const shownCountries = countries.filter((country: string) => countryReg.test(country));

    return isShown && (
      <List ref={this.component}>
        {shownCountries.map((country) =>
          <ListItem key={country} button onClick={() => this.handleCountryClick(country)}>
            <ListItemIcon>
              <LocationIcon/>
            </ListItemIcon>
            <ListItemText primary={country}/>
            {country === expendedItem ? <ExpandLess/> : <ExpandMore/>}

            <Collapse in={country === expendedItem} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {airports[country].map((airport, innerIndex) =>
                  <ListItem key={innerIndex} button className="nested"
                            onClick={(event) => this.handleCityClick(event, airport)}>
                    <ListItemText primary={airport.city} secondary={airport.name}/>
                  </ListItem>
                )}
              </List>
            </Collapse>
          </ListItem>)}
      </List>);
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.airports.isFetching,
  airports: state.airports.data
});

export default connect(mapStateToProps)(AutocompleteList);
