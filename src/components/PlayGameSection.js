import React, { useState, useRef, useEffect } from "react";
import SectionHeader from "./SectionHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import LastPlayedCard from "./LastPlayedCard";
import UserTile from "./UserTile";
import GameOverModal from "./GameOverModal";
import {
  useSingleGame,
  createGameMove,
  useFirebaseGame,
  resetGame,
  updateGame,
} from "../util/db";
import { useAuth } from "../util/auth";
import analytics from "../util/analytics";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  Jumbotron,
  Container,
  Button,
  Form,
  InputGroup,
  ListGroup,
  ListGroupItem,
  Col,
  Row,
  Image,
  Badge,
} from "react-bootstrap";

import * as Fathom from "fathom-client";

import { isHost, currentUser } from "../util/game-utils";

import "./Cards.scss";
import Card from "./Card";
import SmallCard from "./SmallCard";

import LogRocket from "logrocket";

export default function PlayGameSection(props) {
  const auth = useAuth();
  const Router = useRouter();

  const uid = auth.user && auth.user.uid;
  const { data: singleGame, status: otherStatus } = useSingleGame(
    auth.user.uid,
    props.gameId
  );

  if (auth.user && auth.user.uid) {
    LogRocket.identify(auth.user.uid, {
      ...auth.user,
    });
  }

  const res = useFirebaseGame(singleGame?.id);
  const textAreaRef = useRef(null);

  const isLoading = res.status === "loading";

  const host = isLoading ? false : isHost(res.data, uid);
  const shouldInstructionsBeOpen = isLoading
    ? true
    : res.data.status === "created";
  const curUser = !isLoading
    ? currentUser(res.data)
    : { name: "no one", picture: "" };

  const [isGuideOpen, setGuideIsOpen] = useState(true);

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.innerHTML = `!function(e){var t={};function n(a){if(t[a])return t[a].exports;var o=t[a]={i:a,l:!1,exports:{}};return e[a].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(a,o,function(t){return e[t]}.bind(null,o));return a},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){var a=document.querySelector('script[data-name="BMC-Widget"]');window.onload=function(){new FontFace("Avenir Book1","url(https://bmc-cdn.nyc3.digitaloceanspaces.com/Fonts/710789a0-1557-48a1-8cec-03d52d663d74.eot)"),new FontFace("Avenir Book2","url(https://bmc-cdn.nyc3.digitaloceanspaces.com/Fonts/710789a0-1557-48a1-8cec-03d52d663d74.eot)"),new FontFace("Avenir Book3","url(https://bmc-cdn.nyc3.digitaloceanspaces.com/Fonts/710789a0-1557-48a1-8cec-03d52d663d74.eot)"),new FontFace("Avenir Book4","url(https://bmc-cdn.nyc3.digitaloceanspaces.com/Fonts/65d75eb0-2601-4da5-a9a4-9ee67a470a59.woff)"),new FontFace("Avenir Book5","url(https://bmc-cdn.nyc3.digitaloceanspaces.com/Fonts/65d75eb0-2601-4da5-a9a4-9ee67a470a59.woff)");new FontFace("Avenir Book6","url(https://bmc-cdn.nyc3.digitaloceanspaces.com/Fonts/65d75eb0-2601-4da5-a9a4-9ee67a470a59.woff)").load().then((function(e){document.fonts.add(e)})).catch((function(e){}));var e=document.createElement("div");e.id="bmc-wbtn",e.style.display="flex",e.style.alignItems="center",e.style.justifyContent="center",e.style.width="64px",e.style.height="64px",e.style.background=a.dataset.color,e.style.color="white",e.style.borderRadius="32px",e.style.position="fixed","left"==a.dataset.position?e.style.left=a.dataset.y_margin+"px":e.style.right=a.dataset.y_margin+"px",e.style.bottom=a.dataset.x_margin+"px",e.style.boxShadow="0 4px 8px rgba(0,0,0,.4)",e.innerHTML='<img src="https://cdn.buymeacoffee.com/widget/assets/coffee%20cup.svg" alt="Buy Me A Coffee" style="height: 40px; width: 40px; margin: 0; padding: 0;">',e.style.zIndex="999",e.style.cursor="pointer",e.style.fontWeight="600",e.style.transition="all .2s ease";var t=document.createElement("div");t.style.position="fixed",t.style.top="0",t.style.left="0",t.style.width="0",t.style.height="0",t.style.background="rgba(0, 0, 0, 0)",t.style.textAlign="center",t.style.zIndex="9999",t.style.transition="all .4s ease";var n=document.createElement("iframe");n.style.position="fixed",n.style.margin="0",n.style.border="0","left"==a.dataset.position?n.style.left=a.dataset.x_margin+"px":n.style.right=a.dataset.x_margin+"px",n.style.bottom=parseInt(a.dataset.y_margin,10)+80+"px",n.style.height="0",n.style.opacity="0",n.style.width="calc(100vw - 38px)",n.style.maxWidth="320px",n.style.borderRadius="10px",n.style.boxShadow="0 8px 16px rgba(0,0,0,.4)",n.style.background="#fff",n.style.backgroundImage="url(https://marketplace.kony.com/static/dist/images/loader.svg)",n.style.backgroundPosition="center",n.style.backgroundSize="64px",n.style.backgroundRepeat="no-repeat",n.style.zIndex="99999",n.style.transition="all .4s ease",n.style.maxHeight="620px";var o=document.createElement("div");o.style.position="fixed",o.style.display="none",o.style.opacity="0","left"==a.dataset.position?o.style.left=parseInt(a.dataset.y_margin,10)+84+"px":o.style.right=parseInt(a.dataset.x_margin,10)+84+"px",o.style.bottom=parseInt(a.dataset.y_margin,10)-2+"px",o.style.background="#ffffff",o.style.zIndex="999",o.style.transition="all .4s ease",o.innerText=a.dataset.message,o.style.boxShadow="0 4px 8px rgba(0,0,0,.3)",o.style.padding="16px",o.style.borderRadius="4px",o.style.fontSize="14px",o.style.color="#000000",o.style.width="auto",o.style.maxWidth="260px",o.style.lineHeight="1.5",o.style.fontFamily='"Avenir Book1", "Avenir Book2", "Avenir Book3", "Avenir Book4", "Avenir Book5", "Avenir Book6", sans-serif',o.style.display="none",document.body.appendChild(t),t.appendChild(n),document.body.appendChild(e),document.body.appendChild(o);var s=0;e.onclick=function(){s||(n.src="https://www.buymeacoffee.com/widget/page/"+a.dataset.id+"?description="+encodeURIComponent(a.dataset.description)+"&color="+encodeURIComponent(a.dataset.color)),s++,o.style.opacity="0",o.style.display="none",t.style.width="100%",t.style.height="100%",n.style.height="calc(100% - 140px)",n.style.opacity="1",e.style.transform="scale(.8)",e.innerHTML='<svg focusable="false" aria-hidden="true" width="14" height="14"><path fill="#ffffff" d="M13.978 12.637l-1.341 1.341L6.989 8.33l-5.648 5.648L0 12.637l5.648-5.648L0 1.341 1.341 0l5.648 5.648L12.637 0l1.341 1.341L8.33 6.989l5.648 5.648z" fill-rule="evenodd"></path></svg>'},t.onclick=function(){t.style.width="0",t.style.height="0",n.style.height="0",n.style.opacity="0",e.style.transform="scale(1)",e.innerHTML='<img src="https://cdn.buymeacoffee.com/widget/assets/coffee%20cup.svg" alt="Buy Me A Coffee" style="height: 40px; width: 40px; margin: 0; padding: 0;">'},setTimeout((function(){a.dataset.message&&""!=a.dataset.message&&(o.style.display="block",o.style.opacity="1")}),3e3)}}]);`;
    document.getElementsByTagName("head")[0].appendChild(script);
  }, []);

  const getStartingMessage = () => {
    return host
      ? `You are the host of the party. Send the link below to all your friends so they can join you.`
      : "You aren't the host of the party, but you can still invite people to play. Send the link below to all your friends.";
  };
  const copyToClipboard = (e) => {
    if (navigator.share) {
      navigator
        .share({
          title: `${window.location.origin}/game?action=join&code=${
            isLoading ? "" : res.data.roomCode
          }`,
          url: `${window.location.origin}/game?action=join&code=${
            isLoading ? "" : res.data.roomCode
          }`,
          text: `${window.location.origin}/game?action=join&code=${
            isLoading ? "" : res.data.roomCode
          }`,
        })
        .then(() => {
          console.log("Thanks for sharing!");
          // metric goes here
        })
        .catch(console.error);
    } else {
      textAreaRef.current.select();
      document.execCommand("copy");
      e.target.focus();
      window.alert("Copied!");
    }
  };

  const onSettingsToggle = () => {
    // update for everyone else

    setGuideIsOpen(!isGuideOpen);
    updateGame(singleGame?.id, uid, { status: "playing" });
    Fathom.trackGoal("EHWHHISZ", 0);

    // set game status on server
  };

  const onCardClick = async (cardData, shouldFlipCardCallback) => {
    const isItUsersTurn = curUser.name !== "no one" && curUser.uid === uid;
    if (isItUsersTurn && curUser.isMyTurn) {
      // send move to server to validate
      shouldFlipCardCallback(true);
      curUser.isMyTurn = false;
      setTimeout(() => {
        createGameMove(uid, res.data.id, cardData);
      }, 1000);
    }
  };

  const resetGameClick = () => {
    // user clicked something that should reset the game
    resetGame(uid, res.data.id);
  };

  if (
    !isLoading &&
    typeof res.data.users.find((x) => x.uid == uid) === "undefined"
  ) {
    Router.push(`/game?action=join&code=${res.data.roomCode}`);
  }
  return (
    <>
      <GameOverModal
        isGameOver={isLoading ? false : res.data.state.length === 0}
        resetGameCallback={resetGameClick}
      ></GameOverModal>
      {shouldInstructionsBeOpen && (
        <div id="guide">
          <Jumbotron fluid>
            <Container>
              <h1>{`${isLoading ? "" : res.data.name}`}</h1>
              <p>{getStartingMessage()}</p>
              <p>
                {host
                  ? `Once everyone is here, click 'Let's Play'.`
                  : `Waiting on the host to click play ...`}
              </p>
              <Form width="50%">
                <Form.Group controlId="formRoom">
                  <Form.Label>Link</Form.Label>
                  <Form.Control
                    ref={textAreaRef}
                    placeholder="Room link"
                    aria-label="Room link"
                    aria-describedby="basic-addon2"
                    readOnly
                    value={`${window.location.origin}/game?action=join&code=${
                      isLoading ? "" : res.data.roomCode
                    }`}
                  />
                  <InputGroup.Append
                    onClick={copyToClipboard}
                    style={{ marginTop: "14px", marginBottom: "14px" }}
                  >
                    <Button variant="outline-secondary">
                      {navigator.share ? "Invite" : "Copy"}
                    </Button>
                  </InputGroup.Append>
                </Form.Group>
              </Form>
              <h4>Who's all here</h4>
              <ListGroup>
                {isLoading
                  ? ""
                  : res.data.users.map((user) => (
                      <ListGroupItem style={{ height: "72px" }} key={user.uid}>
                        <Image
                          src={user.picture}
                          roundedCircle
                          style={{ height: "48px" }}
                        />
                        <span style={{ marginLeft: "24px" }}>{user.name}</span>
                      </ListGroupItem>
                    ))}
              </ListGroup>

              {host && (
                <p>
                  <Button
                    variant="red"
                    style={{ marginTop: "16px" }}
                    onClick={onSettingsToggle}
                  >
                    Let's Play
                  </Button>
                </p>
              )}
            </Container>
          </Jumbotron>
        </div>
      )}
      {!shouldInstructionsBeOpen && (
        <>
          {/* <Section
            bg={props.bg}
            textColor={props.textColor}
            size={"md"}
            bgImage={props.bgImage}
            bgImageOpacity={props.bgImageOpacity}
          > */}

          <Container>
            <Row>
              <Col>
                <Image
                  src={!isLoading ? curUser.picture : ""}
                  roundedCircle
                  style={{ height: "48px", display: "inline-block" }}
                />
                <h5 style={{ display: "inline-block", marginLeft: "12px" }}>{`${
                  curUser && curUser.name
                }'s turn`}</h5>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="circle-container" style={{ zoom: ".8" }}>
                  {isLoading
                    ? ""
                    : res.data.state
                        .filter((x) => x.available)
                        .slice(0, 6)
                        .map((cardData) => (
                          <Card
                            key={`${cardData.value}-${cardData.suit}`}
                            cardClickHandler={onCardClick}
                            cardData={cardData}
                          ></Card>
                        ))}
                </div>
              </Col>
            </Row>
            <Row style={{ marginTop: "120px" }}>
              {res && res.data && res.data.lastPlayed && (
                <h4>{res.data.state.length} cards left!</h4>
              )}
            </Row>
            <Row>
              {res && res.data && res.data.lastPlayed && (
                <LastPlayedCard cardData={res.data.lastPlayed}></LastPlayedCard>
              )}
            </Row>
            <Row style={{ marginTop: "60px" }}>
              <Col sm={12}>
                <ListGroup>
                  {isLoading
                    ? ""
                    : res.data.users
                        .sort((x, y) => (x.num > y.num ? 1 : -1))
                        .map((user) => (
                          <UserTile
                            key={user.num}
                            userData={user}
                            isMyTurn={
                              isLoading ||
                              (user && user.cards.length == 0) ||
                              auth.user.uid !== user.uid
                            }
                          />
                        ))}
                </ListGroup>
              </Col>
            </Row>
            <Row style={{ marginTop: "40px" }}>
              <Col>
                <h5>Invite</h5>
                <Form width="50%">
                  <Form.Group controlId="formRoom">
                    <Form.Control
                      ref={textAreaRef}
                      placeholder="Room link"
                      aria-label="Room link"
                      aria-describedby="basic-addon2"
                      readOnly
                      value={`${window.location.origin}/game?action=join&code=${
                        isLoading ? "" : res.data.roomCode
                      }`}
                    />
                    <InputGroup.Append
                      onClick={copyToClipboard}
                      style={{ marginTop: "14px", marginBottom: "14px" }}
                    >
                      <Button variant="outline-secondary">
                        {navigator.share ? "Invite" : "Copy"}
                      </Button>
                    </InputGroup.Append>
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </Container>
          {/* </Section> */}
        </>
      )}
    </>
  );
}
