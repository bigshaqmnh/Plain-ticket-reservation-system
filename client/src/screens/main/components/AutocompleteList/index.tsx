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

import { IAirportData, IAirport, IState, IDispatch } from '../../../../interfaces';

import { setSelectedItem } from '../../actionCreators';

import parseLocation from '../../../../helpers/parseLocation';

interface IAutocompleteListProps {
  isLoading: boolean;
  airports: IAirportData;
  selected: number;
  inputValue: string;
  isShown: boolean;
  handleChange: (value: string) => void;
  setSelectedItem: (item: number) => void;
}

interface IAutocompleteListState {
  showAutocomplete: boolean;
  expandedItem: string;
}

class AutocompleteList extends React.PureComponent<IAutocompleteListProps, IAutocompleteListState> {
  private component: React.RefObject<HTMLUListElement> = React.createRef<HTMLUListElement>();

  constructor(props: IAutocompleteListProps) {
    super(props);
    this.state = {
      showAutocomplete: true,
      expandedItem: null
    };
  }

  private handleOutsideClick = (event: MouseEvent) => {
    const { current } = this.component;

    if (current
      &&
      !current.contains(event.target as Node)
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
    const { country: parsedCountry } = parseLocation(nextInput);
    const countryReg: RegExp = new RegExp(parsedCountry, 'ig');

    if (nextInput.length !== prevInput.length) {
      for (const country in airports) {
        if (!countryReg.test(country)) {
          continue;
        }

        this.setState({
          showAutocomplete: true,
          expandedItem: country
        });
      }
    }
  }

  private handleCountryClick = (country: string) => {
    this.props.handleChange(`${country}, `);

    this.setState((prevState) => ({
      showAutocomplete: true,
      expandedItem: prevState.expandedItem ? null : country
    }));
  };

  private handleCityClick = (event, airport: IAirport) => {
    const location = `${airport.country}, ${airport.city}`;
    const { setSelectedItem, handleChange } = this.props;

    handleChange(location);
    setSelectedItem(airport.id);

    this.setState({
      showAutocomplete: false,
      expandedItem: null
    });

    event.stopPropagation();
  };

  public render(): JSX.Element {
    const { isLoading, airports, selected, inputValue } = this.props;
    const { expandedItem } = this.state;
    const isShown = !isLoading && this.state.showAutocomplete;

    const countries: string[] = Object.keys(airports);
    const { country: parsedCountry } = parseLocation(inputValue);
    const countryReg: RegExp = new RegExp(parsedCountry, 'ig');
    const shownCountries = countries.filter((country: string) => countryReg.test(country));

    return isShown && (
      <List ref={this.component}>
        {shownCountries.map((country) =>
          <ListItem key={country} button onClick={() => this.handleCountryClick(country)}>
            <ListItemIcon>
              <LocationIcon/>
            </ListItemIcon>
            <ListItemText primary={country}/>
            {country === expandedItem ? <ExpandLess/> : <ExpandMore/>}

            <Collapse in={country === expandedItem} timeout="auto" unmountOnExit>
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

const mapDispatchToProps = (dispatch: IDispatch) => ({
  setSelectedItem: (item: number) => dispatch(setSelectedItem(item))
});

export default connect(mapStateToProps, mapDispatchToProps)(AutocompleteList);
