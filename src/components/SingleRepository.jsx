import { useParams } from "react-router-native"
import { FlatList, View, StyleSheet } from 'react-native'
import Text from "./Text"
import useRepositoryDetails from '../hooks/useRepositoryDetails'
import RepositoryItem from "./RepositoryItem"
import theme from "../theme"

const styles = StyleSheet.create({
    rating: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderColor: theme.colors.primary,
        borderWidth: 3,
        flexGrow: 0,
        justifyContent: 'center'
    },
});


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

export const ReviewItem = ({ review }) => {
    return (
        <View testID="repositoryItem" style={theme.repository.itemContainer}  >
            <View style={theme.repository.row}>
                <View style={styles.rating}><Text style={{ alignSelf: 'center' }} color='primary' fontWeight='bold'>{review.rating}</Text></View>
                <View style={theme.repository.mainText}>
                    <RepositoryName name={review.user.username} />
                    <RepositoryDescription description={review.createdAt.slice(0, 10)} />
                </View>
            </View>

            <View style={theme.repository.row}>
                <Text style={{ marginLeft: 60 }}>{review.text}</Text>
            </View>
        </View>
    )
}

const RepositoryInfo = ({ repository }) => {
    if (repository === undefined) {
        return (<Text>Loading...</Text>)
    }
    return (
        <RepositoryItem repository={repository} />
    )
}

const SingleRepository = () => {
    let { id } = useParams()
    const variables = { repositoryId: id }
    const { repository, fetchMore } = useRepositoryDetails({ first: 3, ...variables });

    const reviews = repository
        ? repository.reviews.edges.map((edge) => edge.node)
        : [];


    const onEndReach = () => {
        fetchMore();
    };


    return (
        <FlatList
            data={reviews}
            renderItem={({ item }) => <ReviewItem review={item} />}
            keyExtractor={({ id }) => id}
            ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
            onEndReached={onEndReach}
        // onEndReachedThreshold={0.5}
        // ...
        />
    );
}

export default SingleRepository