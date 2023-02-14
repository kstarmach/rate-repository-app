import { View, Image, Pressable, Button } from "react-native";
import Text from "./Text";
import theme from "../theme";
import { useNavigate } from "react-router-native";
import * as Linking from 'expo-linking';

const StatisticsElement = ({ label, count }) => {
  if (count > 999) {
    count = Math.sign(count) * ((Math.abs(count) / 1000).toFixed(1)) + 'k'
  }
  return (
    <View style={theme.repository.statisticsElement}>
      <Text fontWeight='bold'>{count}</Text>
      <Text color="textSecondary">{label}</Text>
    </View>
  )
}

const LanguageElement = ({ language }) => {
  return (
    <View style={{ display: 'flex', flexDirection: 'row' }}>
      <Text style={theme.repository.language}>{language}</Text>
    </View>
  )
}

const RepositoryName = ({ name }) => {
  return (
    <Text fontWeight="bold" fontSize="subheading" testID='fullName'>{name}</Text>
  )
}

const RepositoryDescription = ({ description }) => {
  return (
    <Text fontWeight="normal" fontSize="normal" color="textSecondary">{description}</Text>
  )
}



const RepositoryItem = ({ repository }) => {
  const navigate = useNavigate();
  const onPress = () => {
    navigate('/repository-details/' + repository.id)
  }

  const linking = () => {
    Linking.openURL(repository.url)
  }

  return (
    <Pressable onPress={onPress}>
      <View testID="repositoryItem" style={theme.repository.itemContainer}  >
        <View style={theme.repository.row}>
          <Image
            style={theme.repository.tinyLogo}
            source={{ uri: repository.ownerAvatarUrl }}
          />
          <View style={theme.repository.mainText}>
            <RepositoryName name={repository.fullName} />
            <RepositoryDescription description={repository.description} />
            <LanguageElement language={repository.language} />
          </View>
        </View>

        <View style={theme.repository.row}>
          <StatisticsElement label={"Stars"} count={repository.stargazersCount} />
          <StatisticsElement label={"Forks"} count={repository.forksCount} />
          <StatisticsElement label={"Reviews"} count={repository.reviewCount} />
          <StatisticsElement label={"Rating"} count={repository.ratingAverage} />
        </View>
        {repository.url ? <Button title="Open in GitHub" onPress={linking} /> : ''}

      </View>
    </Pressable>
  )
};

export default RepositoryItem;
