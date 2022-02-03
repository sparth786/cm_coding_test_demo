import {useEffect, useState} from "react";
import {Box, Container, Grid, makeStyles} from '@material-ui/core';
import Image from "next/image";

import pageConfigClient from "../../lib/contentfulService";
import NewsData from "../../components/NewsData";

interface ILogo {
    fields: {
        file: {
            url: string
            description: string
            file: any
            title: string
        }
    }
}

export interface IPageDisplayConfig {
    logo: ILogo
    menuLabel: string
    searchLabel: string
    ttile: string
}

const useStyles = makeStyles({
    newsCardWrapper: {
        display: 'flex',
    },
    headerWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px 24px',
        borderBottom: '1px solid #ccc',
        '& h5': {
            margin: 0,
            fontSize: '16px',
            color: '#333',
        },
        '& h4': {
            margin: 0,
            fontSize: '18px',
            color: '#266ba1',
            fontWeight: '600',

        },
    },
    headerContainer: {},
    logo: {
        padding: '24px 0',
        borderBottom: '1px solid #ccc',
        '&img': {
            maxWidth: '100%',
            height: 'auto',
        },
    },
})

function News() {
    const [pageDisplayConfig, setPageDisplayConfig] = useState<IPageDisplayConfig | null>(null);
    const classes = useStyles();
    useEffect(() => {
        pageConfigClient.getEntries()
            .then(res => {
                const {fields} = res.items[0];
                setPageDisplayConfig(fields as IPageDisplayConfig);
            }).catch(err => {
            console.log(err);
        });
    }, []);

    return (
        <div>
            {pageDisplayConfig && (
                <Container>
                    <Grid className={classes.headerContainer}>
                        <Grid item xs={12}>
                            <Box className={classes.logo}>
                                <Image
                                    src={`https:${pageDisplayConfig.logo.fields.file.url}`}
                                    width={'100'}
                                    height={'30'}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box className={classes.headerWrapper}>
                                <h5>{pageDisplayConfig.menuLabel}</h5>
                                <h4>John Doe</h4>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <NewsData
                                searchLabel={pageDisplayConfig.searchLabel}
                            />
                        </Grid>
                    </Grid>
                </Container>
            )}
        </div>
    );
}

export default News;
