import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import React from 'react';
import { Searchbar } from 'react-native-paper';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;


const SearchbarInput = ({ searchQuery, setSearchQuery }) => {
  const onChangeSearch = query => setSearchQuery(query);

  return (
    <Searchbar
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
    />
  );
};

const SortPicker = ({ sortBy, setSortBy }) => {

  return (
    <Picker selectedValue={sortBy}
      onValueChange={(itemValue) => {
        setSortBy(itemValue)
        console.log(itemValue);
      }}>
      <Picker.Item label="Select an item..." enabled={false} />
      <Picker.Item label="Latest repositories" value={{ orderBy: 'CREATED_AT' }} />
      <Picker.Item label="Highest rated repositories" value={{ orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' }} />
      <Picker.Item label="Lowest rated repositories" value={{ orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' }} />
    </Picker>
  )
}

const RepositoryListHeader = (props) => {
  return (
    <View style={{ padding: 10 }}>
      <SearchbarInput
        searchQuery={props.searchQuery}
        setSearchQuery={props.setSearchQuery}
      />
      <SortPicker
        sortBy={props.sortBy}
        setSortBy={props.setSortBy}
      />
    </View>
  )
}

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    // this.props contains the component's props
    const props = this.props;

    // ...

    return (
      <RepositoryListHeader
        sortBy={props.sortBy}
        setSortBy={props.setSortBy}
        searchQuery={props.searchQuery}
        setSearchQuery={props.setSearchQuery}
      />
    );
  };



  render() {
    const repositoryNodes = this.props.repositories
      ? this.props.repositories.edges.map((edge) => edge.node)
      : [];

    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <RepositoryItem repository={item} />}
        keyExtractor={item => item.id}
        ListHeaderComponent={this.renderHeader}
        onEndReached={this.props.onEndReach}
        onEndReachedThreshold={0.5}
      />
    );
  }
}

const RepositoryList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState({ orderBy: 'CREATED_AT' });

  const variables = { ...sortBy, searchQuery }
  const { repositories, fetchMore } = useRepositories({ first: 8, variables });

  const onEndReach = () => {
    fetchMore();
  };


  return <RepositoryListContainer
    repositories={repositories}
    sortBy={sortBy}
    setSortBy={setSortBy}
    searchQuery={searchQuery}
    setSearchQuery={setSearchQuery}
    onEndReach={onEndReach}
  />;
};

export default RepositoryList;