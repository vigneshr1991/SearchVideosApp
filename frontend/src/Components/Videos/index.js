import { useState } from "react";
import { Spinner, Button } from 'react-bootstrap';
import styled from "styled-components";

import { useFetch } from "../../Hooks/useFetch";
import useDebounce from "../../Hooks/useDebounce";

const MovieContainer = styled.div`
    margin: 10px;
    margin-left: 100px;
`;

const ListContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const Card = styled.div`
    width: 28%;
    display: flex;
    flex-direction: column;
    box-shadow: 2px 2px 20px black;
    border-radius: 5px; 
    margin: 25px;
`;

const ImageSection = styled.div`
    width: 100%;
    min-width: 100%;
    height: 180px;
    max-height: 180px;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    img {
        width: 100%;
        max-width: 100%;
        max-height: 100%;
    }
`;

const ContentSection = styled.div`
    height: 150px;
    max-height: 150px;
    padding: 10px;
    font-size: 18px;
    color: #000;
    font-weight: 500;
    display: flex;
    flex-direction: column;
`;

const InputSection = styled.div`
    text-align: center;
    font-size: 18px;
    font-weight: 500;
    color: #ea5da4;
`;

const Input = styled.input`
    width: 300px;
    padding: 0px 10px;
    border-radius: 10px;
    font-size: 18px;
    font-weight: 500;
    color: #615858;
    &:focus{
        outline: none;
        border-color: none;
    } 
`;

const Title = styled.div`
    white-space: nowrap; 
    overflow: hidden;
    text-overflow: ellipsis; 
    height: 25%;
    text-align: center;
    font-size: 18px;
    font-weight: 600;
`;

const Description = styled.div`
    overflow: hidden;
    text-overflow: ellipsis; 
    height: 50%;
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 5px;
`;

const ChannelName = styled.div`
    white-space: nowrap; 
    overflow: hidden;
    text-overflow: ellipsis; 
    height: 25%;
    font-size: 14px;
    font-weight: 500;
`;

const NoMoviesFound = styled.h1`
    text-align: center;
`;

const Pagination = styled.div`
    text-align: center;
`;

const Videos = (props) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [nextPageTS, setNextPageTS] = useState();
    const [prevPageTS, setPrevPageTS] = useState();
    const [pageDirection, setPageDirection] = useState(1);
    const [pageNumber, setPageNumber] = useState(0);
    const [sortBy, setSortBy] = useState('DESC');

    const debouncedSearchTerm = useDebounce(searchQuery, 500);

    const handlePagination = (isNext = true) => {
        setPageNumber(isNext ? pageNumber + 1 : pageNumber - 1);
        setPageDirection(isNext ? 1 : -1);
    }

    const handleResponse = (resp) => {
        const { nextPageTS, prevPageTS } = resp;

        setNextPageTS(nextPageTS);
        setPrevPageTS(prevPageTS);
    }

    let url = `http://localhost:3001/search?searchQuery=${searchQuery}&pageLimit=9`;

    if (pageDirection > 0) {
        if (nextPageTS) {
            url = `${url}&lastPageTS=${nextPageTS}&pageDirection=${pageDirection}` 
        }
    } else if (prevPageTS) {
        url = `${url}&lastPageTS=${prevPageTS}&pageDirection=${pageDirection}`
    }

    if (sortBy === 'ASC') {
        url = `${url}&sortBy=publishedAt`
    } else {
        url = `${url}&sortBy=-publishedAt`
    }

    const [loading, data] = useFetch(url, [debouncedSearchTerm, nextPageTS, sortBy, pageDirection, pageNumber]);

    const videos = !loading && data?.data?.map(video => {
        const thumbImg = video.thumbnails?.medium?.url || video.thumbnails?.default?.url
        return(
            <Card key={video.videoId}>
                <ImageSection>
                    <img src={thumbImg} alt={video.title} />
                </ImageSection>
                <ContentSection>
                    <Title>{video.title}</Title>
                    <Description><strong>Description : </strong>{video.description}</Description>
                    <ChannelName><strong>Channel : </strong>{video.channelTitle}</ChannelName>
                </ContentSection>
            </Card>
        );
    });
    
    return(
        <MovieContainer>
            <InputSection>
                Search Videos : <Input
                    placeholder="Search video by title/description"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </InputSection>
            <br />
            <hr />
            <ListContainer>
                {loading && <Spinner animation="border" />}
                {videos && videos.length ? videos : <NoMoviesFound>No Videos found</NoMoviesFound>}
            </ListContainer>
            <Pagination>
                <Button variant="secondary">Previous</Button>
                <Button variant="secondary">Next</Button>
            </Pagination>
        </MovieContainer>
    )
}

export default Videos;