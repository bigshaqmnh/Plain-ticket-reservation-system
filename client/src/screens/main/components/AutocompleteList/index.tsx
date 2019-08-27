import React from 'react';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import LocationIcon from '@material-ui/icons/LocationOn';
import ExpandLess from '@material-ui/icons/KeyboardArrowLeft';
import ExpandMore from '@material-ui/icons/KeyboardArrowDown';

import { IAirportData, IAirport, IState } from '../../../../interfaces';

import { setSelectedItem } from '../../actionCreators';

import { parseCountry } from '../../../../helpers/parseLocation';

interface IAutocompleteListProps {
  isLoading: boolean;
  airports: IAirportData;
  selected: number;
  inputValue: string;
  isShown: boolean;
  handleChange: (value: string) => void;
  dispatch?: (action: object) => void;
}

interface IAutocompleteListState {
  showAutocomplete: boolean;
  expendedItem: string;
}

class AutocompleteList extends React.PureComponent<IAutocompleteListProps, IAutocompleteListState> {
  private component: React.RefObject<any> = React.createRef();

  constructor(props: IAutocompleteListProps) {
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

  public componentDidUpdate(prevProps: Readonly<IAutocompleteListProps>): void {
    const { inputValue: nextInput, airports } = this.props;
    const { inputValue: prevInput } = prevProps;
    const countryReg: RegExp = new RegExp(parseCountry(nextInput), 'ig');

    if (nextInput.length !== prevInput.length) {
      for (const country in airports) {
        if (!countryReg.test(country)) {
          continue;
        }

        this.setState({
          showAutocomplete: true,
          expendedItem: country
        });
      }
    }
  }

  private handleCountryClick = (country: string) => {
    this.props.handleChange(`${country}, `);

    this.setState((prevState) => ({
      showAutocomplete: true,
      expendedItem: prevState.expendedItem ? null : country
    }));
  };

  private handleCityClick = (event, airport: IAirport) => {
    const location = `${airport.country}, ${airport.city}`;
    const { dispatch, handleChange } = this.props;

    handleChange(location);
    dispatch(setSelectedItem(airport.id));

    this.setState({
      showAutocomplete: false,
      expendedItem: null
    });

    event.stopPropagation();
  };

  public render(): JSX.Element {
    const { isLoading, airports, selected, inputValue } = this.props;
    const { expendedItem } = this.state;
    const isShown = !isLoading && this.state.showAutocomplete;

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
                {airports[country].map((airport, innerIndex) => {
                  if (airport.id === selected) {
                    return null;
                  }

                  return <ListItem
                    key={innerIndex}
                    button
                    className="nested"
                    onClick={(event) => this.handleCityClick(event, airport)}
                  >
                    <ListItemText primary={airport.city} secondary={airport.name}/>
                  </ListItem>;
                })}
              </List>
            </Collapse>
          </ListItem>)}
      </List>);
  }
}

const mapStateToProps = (state: IState) => ({
  isLoading: state.airports.isFetching,
  airports: state.airports.data,
  selected: state.airports.selectedItem
});

export default connect(mapStateToProps)(AutocompleteList);
