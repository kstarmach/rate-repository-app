import { useMutation, useQuery } from "@apollo/client"
import { FlatList, View, StyleSheet, Button, Alert } from "react-native"
import { GET_CURRENT_USER } from '../graphql/queries'
import { useNavigate } from "react-router-native"
import theme from '../theme'
import Text from "./Text"
import { DELETE_REPOSITORY } from "../graphql/mutations"

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

const ReviewItem = ({ review, refetch }) => {
    const navigate = useNavigate()
    const [mutate] = useMutation(DELETE_REPOSITORY)
    const handleNavigate = () => {
        navigate('/repository-details/' + review.repositoryId)
    }

    const deleteReview = () => {
        mutate({ variables: { deleteReviewId: review.id } })
        refetch()
    }

    const removeReview = () => Alert.alert('Delete review', 'Are you sure you want to delete this review?', [
        {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
        },
        {
            text: 'DELETE', onPress: () => deleteReview()
        },
    ]);


    return (
        <View testID="repositoryItem" style={theme.repository.itemContainer}  >
            <View style={theme.repository.row}>
                <View style={styles.rating}><Text style={{ alignSelf: 'center' }} color='primary' fontWeight='bold'>{review.rating}</Text></View>
                <View style={theme.repository.mainText}>
                    <RepositoryName name={review.repository.name} />
                    <RepositoryDescription description={review.createdAt.slice(0, 10)} />
                </View>
            </View>

            <View style={theme.repository.row}>
                <Text style={{ marginLeft: 60 }}>{review.text}</Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', marginTop: 5 }}>
                <View style={{ flexGrow: 1, margin: 10 }}>
                    <Button title={"View repository"} onPress={handleNavigate} />
                </View>
                <View style={{ flexGrow: 1, margin: 10 }}>
                    <Button title={"Delete review"} color="red" onPress={removeReview} />
                </View>
            </View>

        </View>
    )
}

const MyReviews = () => {

    const { data, refetch } = useQuery(GET_CURRENT_USER, {
        variables: {
            includeReviews: true,
        },
        fetchPolicy: "cache-and-network",
    });



    const reviews = data
        ? data.me.reviews.edges.map((edge) => edge.node)
        : [];

    return (
        <FlatList
            data={reviews}
            renderItem={({ item }) => <ReviewItem review={item} refetch={refetch} />}
            keyExtractor={({ id }) => id}

        />
    );

}

export default MyReviews