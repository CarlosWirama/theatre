import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';
import queryStringParser from 'query-string';
import Header from 'components/Header';
import Image from 'components/Image';

export default class DetailPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDetailLoading: false,
      isCastsLoading: false,
      cast: [],
    };
  }

  componentDidMount() {
    this.getDetails();
  }

  getDetails() {
    /** TODO: remove error before fetch, and
     * TODO: add error catch / show errors from response */
    this.setState({ isDetailLoading: true, isCastsLoading: true });

    /** get `q` params from URL's query string */
    const { id } = queryStringParser.parse(this.props.queryString);
    this.props.detailApi(id)
      .then(response => this.setState({
        isDetailLoading: false,
        ...response,
      }));
      this.props.creditApi(id)
      .then(({ cast = [] }) => this.setState({
        isCastsLoading: false,
        cast,
      }));
  }

  render() {
    const {
      imagePropertyPrefix,
      detailPropertyName,
      descriptionPropertyName,
      listDetailPropertyName,
    } = this.props;
    const {
      linkTo,
      imagePropertyPrefix: subImagePrefix,
      titlePropertyName,
      subTitlePropertyName,
    } = listDetailPropertyName;
    return (
      <React.Fragment>
        <Header {...this.props}>
          {this.state.name || this.state.title || 'Loading...'}
        </Header>
        { this.state.isDetailLoading ? 'Loading' :
          <Content>
            <StyledGrid container>
              <Image src={this.state[`${imagePropertyPrefix}_path`]} alt={`${imagePropertyPrefix}-image`} />
              <DetailContainer>
                {detailPropertyName.map(detail =>
                  <Detail {...detail} value={this.state[detail.field]} key={detail.field} />
                )}
              </DetailContainer>
            </StyledGrid>
            <LongDescription>{this.state[descriptionPropertyName]}</LongDescription>
            <Cast>
              {this.state.cast.map((item, i) =>
                <Link to={`${linkTo}?id=${item.id}`} key={i}>
                  <ListItem container>
                    <Image
                      src={item[`${subImagePrefix}_path`]}
                      imageSize="w45"
                      alt={subImagePrefix}
                    />
                    <ListItemDetail>
                      <ListItemTitle>{item[titlePropertyName]}</ListItemTitle>
                      <ListItemContent>{item[subTitlePropertyName]}</ListItemContent>
                    </ListItemDetail>
                  </ListItem>
                </Link>
              )}
            </Cast>
          </Content>
        }
      </React.Fragment>
    );
  }
}

function Detail({ title, value, render, formatter }) {
  /** don't render anything if value === undefined || null || '' */
  if (!value && value !== 0) return '';
  if (render) return render({value});
  if (formatter) value = formatter(value);
  return(
    <React.Fragment>
      <DetailTitle>{title}</DetailTitle>
      <DetailValue>{value}</DetailValue>
    </React.Fragment>
  );
}

const Content = styled.div`
  padding: 56px 16px 0;
`;

const LongDescription = styled.div`
  text-align: justify;
  text-indent: 2em;
`;

const DetailTitle = styled.div`
  font-size: 11pt;
  letter-spacing: 1px;
  color: #ababab;
`;

const DetailValue = styled.div`
  margin-bottom: 16px;
`;

const StyledGrid = styled(Grid)`
  margin: 16px 0;
`;

/** TODO: (show more) button */
const DetailContainer = styled.div`
  flex: 1;
  margin-left: 16px;
`;

const Cast = styled.div`
  margin-top: 16px;
`;

const ListItem = styled(Grid)`
  margin-bottom: 8px;
  cursor: pointer;
`;

const ListItemDetail = styled.div`
  margin-left: 8px;
  color: white;
  max-width: calc(100% - 45px - 8px);
  div {
    text-decoration: none;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const ListItemTitle = styled.div`
  font-weight: 700;
`;

const ListItemContent = styled.div`
  font-size: 11pt;
  color: #ababab;
`;
