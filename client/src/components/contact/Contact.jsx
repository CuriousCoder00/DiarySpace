
import { Box, styled, Typography, Link } from '@mui/material';
import { LinkedIn, Email } from '@mui/icons-material';
import Banner from '../banner/Banner';


const Wrapper = styled(Box)`
    padding: 20px;
    & > h3, & > h5 {
        margin-top: 50px;
    }
`;

const Text = styled(Typography)`
    color: #878787;
`;


const Contact = () => {
    return (
        <Box>
            <Banner/>
            <Wrapper>
                <Typography variant="h3">Getting in touch is easy!</Typography>    
                <Text variant="h5">
                    Reach out to me on
                    <Link href="https://www.instagram.co/in/curiouscoder001/" color="inherit" target="_blank">
                        <LinkedIn/>
                    </Link>
                    or send me an Email 
                    <Link href="mailto:2022mcakapil11571@poornima.edu.in?Subject=This is a subject" target="_blank" color="inherit">
                        <Email />
                    </Link>.
                </Text>
            </Wrapper>
        </Box>
    );
}

export default Contact;