import * as React from "react";
import { Text, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";

const Cover = () => {
  const [activeScreen, setActiveScreen] = useState('stats')

  const renderScreen = () => {
    switch (activeScreen) {
      case 'stats':
        return (
          <View style={[styles.feedTurnedOn, styles.feedShadowBox1]}>
          <View style={styles.frameParent}>
            <View style={[styles.groupWrapper, styles.groupWrapperLayout]}>
              <View style={[styles.groupParent, styles.groupParentPosition]}>
                <View style={[styles.groupContainer, styles.groupPosition1]}>
                  <View style={[styles.groupContainer, styles.groupPosition1]}>
                    <View style={[styles.groupContainer, styles.groupPosition1]}>
                      <View
                        style={[styles.groupContainer, styles.groupPosition1]}
                      >
                        <View style={[styles.recall, styles.groupPosition1]}>
                          <Text style={[styles.quizzes, styles.quizzesTypo]}>
                            <Text style={styles.text}>
                              <Text style={styles.textLayout}>55</Text>
                            </Text>
                            <Text style={styles.text}>
                              <Text style={styles.text3}>{` 
  `}</Text>
                            </Text>
                            <Text style={styles.quizzes1}>Quizzes</Text>
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
               
              </View>
            </View>
            <View style={[styles.groupWrapper1, styles.groupWrapperLayout]}>
              <View style={[styles.groupParent1, styles.groupParentPosition]}>
                <View style={[styles.groupContainer, styles.groupPosition1]}>
                  <View style={[styles.groupContainer, styles.groupPosition1]}>
                    <View style={[styles.groupContainer, styles.groupPosition1]}>
                      <View
                        style={[styles.groupContainer, styles.groupPosition1]}
                      >
                        <View style={[styles.recall, styles.groupPosition1]}>
                          <Text style={[styles.leaderboard, styles.quizzesTypo]}>
                            <Text style={[styles.text4, styles.textLayout]}>{`#2
  `}</Text>
                            <Text style={styles.quizzes1}>{`Leaderboard `}</Text>
                          </Text>
                          <Image
                            style={[styles.iconLeaderboard, styles.iconLayout1]}
                            contentFit="cover"
                            source={require("../assets/stats_2500115.png")}
                          />
                          <Image
                            style={[
                              styles.iconLeaderboard1,
                              styles.medals53Position,
                            ]}
                            contentFit="cover"
                            source={require("../assets/stats_2500115.png")}
                          />
                          
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
                <Image
                  style={styles.groupItem}
                  contentFit="cover"
                  source={require("../assets/stats_2500115.png")}
                />
              </View>
            </View>
          </View>
          <Text style={styles.aryaMuller}>{`Arya Muller `}</Text>
          <Image
            style={[styles.photoAlice, styles.iconGroupLayout]}
            contentFit="cover"
            source={require("../assets/profileluke.avif")}
          />
          <Image
            style={[styles.photoAlice, styles.iconGroupLayout]}
            contentFit="cover"
            source={require("../assets/profileluke.avif")}
          />
          <Image
            style={styles.iconSettings}
            contentFit="cover"
            source={require("../assets/settingIcon.jpg")}
          />
         
          
          <Text style={[styles.time, styles.timeTypo]}>9:41</Text>
          <View style={[styles.feedTurnedOnInner, styles.feedShadowBox]}>
            <View style={[styles.groupContainer, styles.groupPosition1]}>
              <View style={[styles.recall, styles.groupPosition1]}>
                <Image
                  style={[styles.iconLeaderboard2, styles.iconLayout1]}
                  contentFit="cover"
                  source={require("../assets/stats_2500115.png")}
                />
                
                <Text style={[styles.quizzes, styles.quizzesTypo]}>
                  <Text style={styles.text}>
                    <Text style={styles.textLayout}>86%</Text>
                  </Text>
                  <Text style={styles.text}>
                    <Text style={styles.text3}>{` 
  `}</Text>
                  </Text>
                  <Text style={styles.quizzes1}>Recall</Text>
                </Text>
              </View>
            </View>
          </View>
          <View style={[styles.groupParent2, styles.groupParentShadowBox1]}>
            <Image
              style={[styles.groupInner, styles.iconGroupLayout]}
              contentFit="cover"
              source={require("../assets/stats_2500115.png")}
            />
            <View style={[styles.rectangleParent, styles.rectangleParentLayout1]}>
              <Image
                style={[styles.rectangleIcon, styles.groupChild4Layout]}
                contentFit="cover"
                source={require("../assets/compliance.avif")}
              />
              <Text style={styles.topicName}>Compliance Protocols</Text>
              <LinearGradient
                style={[styles.adjustableProgressBar, styles.adjustablePosition]}
                locations={[0, 1]}
                colors={["#ffbf1a", "#ff4080"]}
              />
              <View style={[styles.progressWrapper, styles.progressLayout4]}>
                <LinearGradient
                  style={[styles.progress, styles.progressPosition]}
                  locations={[0, 1]}
                  colors={["#ffbf1a", "#ff4080"]}
                />
              </View>
              <Text style={[styles.text9, styles.textPosition]}>
                <Text style={styles.text10}>{`35% `}</Text>
                <Text style={styles.correct}>Correct</Text>
              </Text>
            </View>
            <View style={[styles.rectangleGroup, styles.rectangleParentLayout1]}>
              <Image
                style={[styles.rectangleIcon, styles.groupChild4Layout]}
                contentFit="cover"
                source={require("../assets/foods.avif")}
              />
              <Text style={[styles.topicName1, styles.topicPosition1]}>
                Food Safety
              </Text>
              <LinearGradient
                style={[styles.adjustableProgressBar, styles.adjustablePosition]}
                locations={[0, 1]}
                colors={["#ffbf1a", "#ff4080"]}
              />
              <View style={[styles.progressWrapper, styles.progressLayout4]}>
                <LinearGradient
                  style={[styles.progress, styles.progressPosition]}
                  locations={[0, 1]}
                  colors={["#ffbf1a", "#ff4080"]}
                />
              </View>
              <Text style={[styles.text11, styles.textPosition]}>
                <Text style={styles.text10}>{`28% `}</Text>
                <Text style={styles.correct}>Correct</Text>
              </Text>
            </View>
            <View
              style={[styles.rectangleContainer, styles.rectangleParentLayout1]}
            >
              <Image
                style={[styles.rectangleIcon, styles.groupChild4Layout]}
                contentFit="cover"
                source={require("../assets/socialmedia.avif")}
              />
              <Text style={styles.topicName2}>Social Media Policies</Text>
              <LinearGradient
                style={[styles.adjustableProgressBar, styles.adjustablePosition]}
                locations={[0, 1]}
                colors={["#ffbf1a", "#ff4080"]}
              />
              <View style={[styles.progressFrame, styles.progressLayout3]}>
                <LinearGradient
                  style={[styles.progress2, styles.progressLayout3]}
                  locations={[0, 1]}
                  colors={["#ffbf1a", "#ff4080"]}
                />
              </View>
              <Text style={[styles.text11, styles.textPosition]}>
                <Text style={styles.text10}>{`40% `}</Text>
                <Text style={styles.correct}>Correct</Text>
              </Text>
            </View>
          </View>
          <Text style={[styles.strongestTopics, styles.topicsTypo]}>
            STRONGEST TOPICS
          </Text>
          <Text style={[styles.weakestTopics, styles.topicsTypo]}>
            WEAKEST TOPICS
          </Text>
          <View style={styles.statsWrapper}>
            <Text style={styles.stats}>STATS</Text>
          </View>
          <View style={[styles.groupParent3, styles.groupParentShadowBox1]}>
            
            <View
              style={[styles.rectangleParent1, styles.rectangleParentPosition]}
            >
              <Image
                style={[styles.rectangleIcon, styles.groupChild4Layout]}
                contentFit="cover"
                source={require("../assets/cybersecuity.avif")}
              />
              <Text style={styles.topicName}>Cyber Security</Text>
              <LinearGradient
                style={[styles.adjustableProgressBar, styles.adjustablePosition]}
                locations={[0, 1]}
                colors={["#2fea9b", "#7fdd53"]}
              />
              <View style={[styles.progressWrapper1, styles.progressLayout2]}>
                <LinearGradient
                  style={[styles.progress3, styles.progressLayout2]}
                  locations={[0, 1]}
                  colors={["#2fea9b", "#7fdd53"]}
                />
              </View>
              <Text style={[styles.text11, styles.textPosition]}>
                <Text style={styles.text10}>{`90% `}</Text>
                <Text style={styles.correct}>Correct</Text>
              </Text>
            </View>
            <View style={styles.rectangleParent2}>
              <Image
                style={[styles.groupChild4, styles.groupChild4Layout]}
                contentFit="cover"
                source={require("../assets/interpersonal.avif")}
              />
              <Text style={[styles.topicName4, styles.topicPosition1]}>
                Interpersonal Communication
              </Text>
              <LinearGradient
                style={[styles.adjustableProgressBar4, styles.adjustablePosition]}
                locations={[0, 1]}
                colors={["#2fea9b", "#7fdd53"]}
              />
              <View style={[styles.progressWrapper2, styles.progressLayout1]}>
                <LinearGradient
                  style={[styles.progress4, styles.progressLayout1]}
                  locations={[0, 1]}
                  colors={["#2fea9b", "#7fdd53"]}
                />
              </View>
              <Text style={[styles.text17, styles.textPosition]}>
                <Text style={styles.text10}>{`95% `}</Text>
                <Text style={styles.correct}>Correct</Text>
              </Text>
            </View>
            <View
              style={[styles.rectangleParent3, styles.rectangleParentPosition]}
            >
              
              <Text style={styles.topicName2}>{`WFH Policies `}</Text>
              <LinearGradient
                style={[styles.adjustableProgressBar, styles.adjustablePosition]}
                locations={[0, 1]}
                colors={["#2fea9b", "#7fdd53"]}
              />
              <View style={[styles.progressWrapper3, styles.progressLayout]}>
                <LinearGradient
                  style={[styles.progress5, styles.progressLayout]}
                  locations={[0, 1]}
                  colors={["#2fea9b", "#7fdd53"]}
                />
              </View>
              <Text style={[styles.text9, styles.textPosition]}>
                <Text style={styles.text10}>{`87% `}</Text>
                <Text style={styles.correct}>Correct</Text>
              </Text>
            </View>
          </View>
          <View style={[styles.feedTurnedOnChild, styles.groupWrapperLayout]}>
            <View style={[styles.groupParent1, styles.groupParentPosition]}>
              <View style={[styles.groupContainer, styles.groupPosition1]}>
                <View style={[styles.groupContainer, styles.groupPosition1]}>
                  <View style={[styles.groupContainer, styles.groupPosition1]}>
                    <View style={[styles.groupContainer, styles.groupPosition1]}>
                      <View style={[styles.recall, styles.groupPosition1]}>
                        <Text style={[styles.quizzes, styles.quizzesTypo]}>
                          <Text style={[styles.text4, styles.textLayout]}>{`83%
  `}</Text>
                          <Text style={styles.quizzes1}>Accuracy</Text>
                        </Text>
                        <Image
                          style={[styles.recallInner, styles.iconGroupLayout]}
                          contentFit="cover"
                          source={require("../assets/checked_6861732.png")}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={[styles.groupParent4, styles.groupParentShadowBox]}>
            <View style={[styles.groupParent5, styles.groupParentLayout]}>
              <Image
                style={[styles.groupChild6, styles.groupParentLayout]}
                contentFit="cover"
                source={require("../assets/stats_2500115.png")}
              />
              <View style={[styles.topicNameParent, styles.topicPosition1]}>
                <Text style={[styles.topicName6, styles.topicLayout]}>
                  Change Management
                </Text>
                <Text style={[styles.text22, styles.textPosition]}>
                  <Text style={[styles.text23, styles.textTypo2]}>{`94% `}</Text>
                  <Text style={styles.text28Typo}>Correct</Text>
                </Text>
              </View>
            </View>
            <View style={[styles.groupParent6, styles.groupParentLayout]}>
              <Image
                style={[styles.groupChild6, styles.groupParentLayout]}
                contentFit="cover"
                source={require("../assets/stats_2500115.png")}
              />
              <View style={[styles.topicNameParent, styles.topicPosition1]}>
                <Text style={[styles.topicName7, styles.topicLayout]}>
                  Product Development
                </Text>
                <Text style={[styles.text24, styles.textPosition]}>
                  <Text style={[styles.text23, styles.textTypo2]}>{`91% `}</Text>
                  <Text style={styles.text28Typo}>Correct</Text>
                </Text>
              </View>
            </View>
            
           
          </View>
          <View style={styles.achievementsParent}>
            <Text style={[styles.achievements, styles.achievementsTypo]}>
              ACHIEVEMENTS
            </Text>
            <Text style={[styles.activity, styles.activityTypo]}>ACTIVITY</Text>
            <Text style={[styles.stats1, styles.statsTypo]}>STATS</Text>
            <View style={[styles.lineView, styles.lineViewLayout]} />
            <View style={[styles.groupChild8, styles.lineViewLayout]} />
          </View>
        </View>
        )
      case 'achievements':
        return (
          <View style={[styles.feedTurnedOn1, styles.feedShadowBox1]}>
        <Text style={styles.aryaMuller}>{`Arya Muller `}</Text>
        <Image
          style={[styles.photoAlice, styles.iconGroupLayout]}
          contentFit="cover"
          source={require("../assets/profileluke.avif")}
        />
        <Image
          style={[styles.photoAlice, styles.iconGroupLayout]}
          contentFit="cover"
          source={require("../assets/profileluke.avif")}
        />
        <Text style={[styles.medals53, styles.topicsTypo]}>
          <Text style={styles.medals}>{`MEDALS `}</Text>
          <Text style={styles.text26}>53</Text>
        </Text>
        <View style={[styles.medallionTile, styles.medallionShadowBox]}>
          <View style={[styles.rectangleParent4, styles.groupParentPosition]}>
            <View style={[styles.recall, styles.groupPosition1]} />
            <Text
              style={styles.cryptocurrencyTypo}
            >{`Safeksldjlty & Security `}</Text>
          </View>
          <Image
            style={styles.medallionsIconPosition}
            contentFit="cover"
            source={require("../assets/silvermedalcert.jpg")}
          />
          <View style={styles.rectangleParent5}>
            <View style={[styles.groupChild9, styles.groupPosition1]} />
            <View style={styles.goldCertifiedWrapper}>
              <Text
                style={[styles.goldCertified, styles.textTypo2]}
              >{`Gold Certified `}</Text>
            </View>
          </View>
        </View>
        <View style={[styles.labels, styles.labelsLayout]}>
          <View style={[styles.labelsChild, styles.labelsPosition]} />
          <Text style={[styles.bronzeCertified, styles.certifiedPosition]}>
            Bronze Certified
          </Text>
        </View>
        <Text style={[styles.certifications8, styles.rectangleParentPosition]}>
          <Text style={styles.medals}>{`CERTIFICATIONS  `}</Text>
          <Text style={styles.text26}>8</Text>
        </Text>
        <View style={styles.medallionTile1}>
          <View style={[styles.rectangleParent6, styles.groupParentPosition]}>
            <View style={[styles.recall, styles.groupPosition1]} />
            <Text style={[styles.foodSafetyProtocols, styles.timeTypo]}>
              Food Safety Protocols
            </Text>
          </View>
          <View style={styles.labels1}>
            <View style={[styles.labelsChild, styles.labelsPosition]} />
            <Text style={[styles.bronzeCertified, styles.certifiedPosition]}>
              Bronze Certified
            </Text>
          </View>
          <Image
            style={[styles.medallionsIcon1, styles.iconGroupLayout]}
            contentFit="cover"
            source={require("../assets/bronzecertification.jpg")}
          />
        </View>
        <View style={[styles.medallionTile2, styles.medallionShadowBox]}>
          <View style={[styles.rectangleParent4, styles.groupParentPosition]}>
            <View style={[styles.recall, styles.groupPosition1]} />
            <Text
              style={[styles.cryptocurrencyBasics1, styles.cryptocurrencyTypo]}
            >{`Facilities & Maintenance `}</Text>
          </View>
          <Image
            style={[styles.medallionsIcon2, styles.medallionsIconPosition]}
            contentFit="cover"
            source={require("../assets/bronzecertification.jpg")}
          />
          <View style={styles.rectangleParent5}>
            <View style={[styles.groupChild9, styles.groupPosition1]} />
            <View style={styles.goldCertifiedWrapper}>
              <Text
                style={[styles.goldCertified, styles.textTypo2]}
              >{`Gold Certified `}</Text>
            </View>
          </View>
        </View>
        <Text
          style={[styles.facilitiesMaintenance, styles.timeTypo]}
        >{`Facilities & Maintenance `}</Text>
        <Text style={[styles.badges, styles.textTypo2]}>BADGES</Text>
        <View style={[styles.quizGeniusParent, styles.groupWrapper9Layout]}>
          <Text
            style={[styles.quizGenius, styles.aceTypo]}
          >{`Quiz Genius `}</Text>
          <Text style={[styles.ace, styles.aceTypo]}>Ace</Text>
          <Text style={[styles.almostPerfect, styles.aceTypo]}>
            Almost Perfect
          </Text>
          <Text style={[styles.passed500Quizzes, styles.passed500Typo]}>
            Passed 500 Quizzes
          </Text>
          <Text style={[styles.earnedPerfectScores, styles.passed500Typo]}>
            Earned perfect scores on 25 quizzes
          </Text>
          <Text style={[styles.passed500Quizzes1, styles.passed500Typo]}>
            Passed 500 Quizzes
          </Text>
          <View style={[styles.groupWrapper9, styles.groupWrapper9Layout]}>
            <View style={[styles.groupWrapper10, styles.groupPosition1]}>
              <View style={[styles.groupContainer, styles.groupPosition1]}>
                <View style={[styles.recall, styles.groupPosition1]}>
                  <Text
                    style={[
                      styles.quizGeniusPassedContainer,
                      styles.quizContainerTypo,
                    ]}
                  >
                    <Text style={styles.text}>{`Quiz Genius 
`}</Text>
                    <Text style={styles.medals}>Passed 500 Quizzes</Text>
                  </Text>
                  <Text
                    style={[
                      styles.aceEarnedPerfectContainer,
                      styles.the500ContainerTypo,
                    ]}
                  >
                    <Text style={styles.text}>{`Ace
`}</Text>
                    <Text style={styles.medals}>
                      Earned perfect scores on 25 quizzes
                    </Text>
                  </Text>
                  <Text
                    style={[
                      styles.the500ClubContainer,
                      styles.the500ContainerTypo,
                    ]}
                  >
                    <Text style={styles.text}>{`The 500 Club
`}</Text>
                    <Text style={styles.medals}>
                      Earn perfect score on 500 Quizzes
                    </Text>
                  </Text>
                  <Text
                    style={[
                      styles.almostPerfectScoredContainer,
                      styles.almostTypo,
                    ]}
                  >
                    <Text style={styles.text}>{`Almost Perfect
`}</Text>
                    <Text style={styles.medals}>
                      Scored 90% or above on a quiz
                    </Text>
                  </Text>
                  <Text
                    style={[
                      styles.goldStandardScoreContainer,
                      styles.goldContainerTypo,
                    ]}
                  >
                    <Text style={styles.text}>{`Gold Standard
`}</Text>
                    <Text style={styles.medals}>
                      Score 90% or above on 100 quizzes.
                    </Text>
                  </Text>
                  <Text
                    style={[
                      styles.bronzStandardScoreContainer,
                      styles.goldContainerTypo,
                    ]}
                  >
                    <Text style={styles.text}>{`Bronz Standard
`}</Text>
                    <Text style={styles.medals}>
                      Score 90% or above on 100 quizzes.
                    </Text>
                  </Text>
                  <Text
                    style={[styles.badges1, styles.badges1Position]}
                  >{`Badges
`}</Text>
                 
                </View>
               
              </View>
            </View>
          </View>
          <Text style={[styles.scored90Or1, styles.almostTypo]}>
            Scored 90% or above on a quiz
          </Text>
          <Text
            style={[
              styles.quizGeniusPassedContainer1,
              styles.quizContainerTypo,
            ]}
          >
            <Text style={styles.text}>{`Quiz Genius 
`}</Text>
            <Text style={styles.medals}>Passed 500 Quizzes</Text>
          </Text>
          <Text
            style={[
              styles.aceEarnedPerfectContainer1,
              styles.the500ContainerTypo,
            ]}
          >
            <Text style={styles.text}>{`Ace
`}</Text>
            <Text style={styles.medals}>
              Earned perfect scores on 25 quizzes
            </Text>
          </Text>
          <Text
            style={[styles.the500ClubContainer1, styles.the500ContainerTypo]}
          >
            <Text style={styles.text}>{`The 500 Club
`}</Text>
            <Text style={styles.medals}>Earn perfect score on 500 Quizzes</Text>
          </Text>
          <Text
            style={[styles.almostPerfect2, styles.almostTypo]}
          >{`Almost Perfect
`}</Text>
          <Text
            style={[
              styles.goldStandardScoreContainer1,
              styles.goldContainerTypo,
            ]}
          >
            <Text style={styles.text}>{`Gold Standard
`}</Text>
            <Text style={styles.medals}>
              Score 90% or above on 100 quizzes.
            </Text>
          </Text>
         
        </View>
        <View style={[styles.groupParent7, styles.groupParentShadowBox]}>
          <View style={[styles.groupParent5, styles.groupParentLayout]}>
           
            <View style={[styles.topicNameParent, styles.topicPosition1]}>
              <Text style={[styles.topicName6, styles.topicLayout]}>
                Change Management
              </Text>
              <Text style={[styles.text22, styles.textPosition]}>
                <Text style={[styles.text23, styles.textTypo2]}>{`94% `}</Text>
                <Text style={styles.text28Typo}>Correct</Text>
              </Text>
            </View>
          </View>
          <View style={[styles.groupParent6, styles.groupParentLayout]}>
           
            <View style={[styles.topicNameParent, styles.topicPosition1]}>
              <Text style={[styles.topicName7, styles.topicLayout]}>
                Product Development
              </Text>
              <Text style={[styles.text24, styles.textPosition]}>
                <Text style={[styles.text23, styles.textTypo2]}>{`91% `}</Text>
                <Text style={styles.text28Typo}>Correct</Text>
              </Text>
            </View>
          </View>
          
         
        </View>
        <View
          style={[styles.rectangleParent9, styles.rectangleParentShadowBox]}
        >
          <View style={[styles.recall, styles.groupPosition1]} />
          <View style={[styles.groupChild26, styles.groupChildPosition]} />
          <Text style={[styles.text33, styles.textTypo1]}>{`24 `}</Text>
          <Text style={[styles.gold, styles.goldTypo]}>Gold</Text>
          <Image
            style={[styles.medalsIcon, styles.iconGroupLayout]}
            contentFit="cover"
            source={require("../assets/goldmedal.jpg")}
          />
        </View>
        <Image
          style={[styles.feedTurnedOnItem, styles.feedChildLayout]}
          contentFit="cover"
          source={require("../assets/goldmedal.jpg")}
        />
        <View
          style={[styles.rectangleParent10, styles.rectangleParentShadowBox]}
        >
          <View style={[styles.recall, styles.groupPosition1]} />
          <View style={styles.groupChild28} />
          <Text style={styles.text34}>{`18 `}</Text>
          <Text style={[styles.silver, styles.goldTypo]}>Silver</Text>
        </View>
        <Image
          style={[styles.feedTurnedOnChild1, styles.feedChildLayout]}
          contentFit="cover"
          source={require("../assets/silvermedal.jpg")}
        />
        <View
          style={[styles.rectangleParent11, styles.rectangleParentShadowBox]}
        >
          <View style={[styles.recall, styles.groupPosition1]} />
          <View style={[styles.groupChild30, styles.groupChildPosition]} />
          <Text style={[styles.text35, styles.textTypo1]}>11</Text>
          <Text style={[styles.gold, styles.goldTypo]}>Bronze</Text>
          <Image
            style={[styles.medalsIcon, styles.iconGroupLayout]}
            contentFit="cover"
            source={require("../assets/goldmedal.jpg")}
          />
        </View>
        
        <View style={styles.achievementsParent}>
          <Text style={styles.achievementsTypo}>ACHIEVEMENTS</Text>
          <Text style={[styles.activity, styles.activityTypo]}>ACTIVITY</Text>
          <Text style={[styles.stats2, styles.statsTypo]}>STATS</Text>
          <View style={[styles.lineView, styles.lineViewLayout]} />
          <View style={[styles.groupChild8, styles.lineViewLayout]} />
        </View>
        <View style={[styles.statTileSmall, styles.rectanglePosition]}>
          <View style={[styles.groupContainer, styles.groupPosition1]}>
           
            <View style={[styles.groupWrapper11, styles.groupPosition]}>
              <View style={[styles.groupContainer, styles.groupPosition1]}>
                
                
                <View
                  style={[styles.groupParent12, styles.ellipseIconPosition]}
                >
                  
                  <Text style={[styles.text36, styles.textTypo]}>3</Text>
                </View>
                <Text style={[styles.text37, styles.textTypo]}>2</Text>
              </View>
            </View>
            <View style={styles.groupWrapper12}>
              <View style={[styles.groupContainer, styles.groupPosition1]}>
                <View
                  style={[styles.level2Wrapper, styles.groupParentPosition]}
                >
                  <Text
                    style={[styles.level2, styles.textLayout]}
                  >{`Level 2 `}</Text>
                </View>
                <Text style={[styles.pointsToNext, styles.textTypo2]}>
                  500 Points to next level
                </Text>
              </View>
            </View>
            
          </View>
         
        </View>
        <Image
          style={[styles.medallionsIcon3, styles.iconGroupLayout]}
          contentFit="cover"
          source={require("../assets/bronzecertification.jpg")}
        />
        <View style={[styles.labels2, styles.labelsLayout]}>
          <View style={[styles.labelsInner, styles.labelsPosition]} />
          <Text style={[styles.silverCertified, styles.silverTypo]}>
            Silver Certified
          </Text>
        </View>
        <Text style={[styles.silverCertified1, styles.silverTypo]}>
          Silver Certified
        </Text>
        <Image
          style={styles.iconSettings}
          contentFit="cover"
          source={require("../assets/settingIcon.jpg")}
        />
        
        <Text style={[styles.time, styles.timeTypo]}>9:41</Text>
      </View>
        )
      case 'activity':
        return (
          <View style={[styles.feedTurnedOn2, styles.feedShadowBox1]}>
        <Text style={styles.aryaMuller}>{`Arya Muller `}</Text>
        <Image
          style={[styles.photoAlice, styles.iconGroupLayout]}
          contentFit="cover"
          source={require("../assets/profileluke.avif")}
        />
        <Image
          style={[styles.photoAlice, styles.iconGroupLayout]}
          contentFit="cover"
          source={require("../assets/profileluke.avif")}
        />
        <View style={[styles.groupParent15, styles.groupParentShadowBox]}>
          <View style={[styles.groupParent5, styles.groupParentLayout]}>
            <Image
              style={[styles.groupChild6, styles.groupParentLayout]}
              contentFit="cover"
              source={require("../assets/goldmedal.jpg")}
            />
            <View style={[styles.topicNameParent, styles.topicPosition1]}>
              <Text style={[styles.topicName6, styles.topicLayout]}>
                Change Management
              </Text>
              <Text style={[styles.text22, styles.textPosition]}>
                <Text style={[styles.text23, styles.textTypo2]}>{`94% `}</Text>
                <Text style={styles.text28Typo}>Correct</Text>
              </Text>
            </View>
          </View>
          <View style={[styles.groupParent6, styles.groupParentLayout]}>
            
            <View style={[styles.topicNameParent, styles.topicPosition1]}>
              <Text style={[styles.topicName7, styles.topicLayout]}>
                Product Development
              </Text>
              <Text style={[styles.text24, styles.textPosition]}>
                <Text style={[styles.text23, styles.textTypo2]}>{`91% `}</Text>
                <Text style={styles.text28Typo}>Correct</Text>
              </Text>
            </View>
          </View>
         
          
         
        </View>
        <View style={styles.achievementsParent}>
          <Text style={[styles.achievements2, styles.achievementsTypo]}>
            ACHIEVEMENTS
          </Text>
          <Text style={[styles.activity2, styles.activityTypo]}>ACTIVITY</Text>
          <Text style={[styles.stats3, styles.statsTypo]}>STATS</Text>
          <View style={[styles.lineView, styles.lineViewLayout]} />
          <View style={[styles.groupChild8, styles.lineViewLayout]} />
        </View>
        <Image
          style={styles.iconSettings}
          contentFit="cover"
          source={require("../assets/settingIcon.jpg")}
        />
        
        
        <Text style={[styles.time, styles.timeTypo]}>9:41</Text>
        <View style={styles.historyRowWrapper}>
          <View style={[styles.historyRow, styles.borderPosition]}>
            <View style={styles.property1longQuizTitle}>
              <Image
                style={styles.medallionsIcon4}
                contentFit="cover"
                source={require("../assets/goldmedal.jpg")}
              />
              <View style={styles.historyText}>
                <Text style={[styles.earnedLine, styles.earnedLineFlexBox]}>
                  <Text style={styles.earned}>{`Earned `}</Text>
                  <Text
                    style={styles.textTypo2}
                  >{`Gold Certification in Change Management `}</Text>
                </Text>
                <Text style={[styles.dateCompleted, styles.earnedLineFlexBox]}>
                  May 1, 2022 • 5/5 Correct
                </Text>
              </View>
            </View>
            <View style={styles.property1preTestFlexBox}>
              
              <View style={styles.historyText}>
                <Text style={[styles.earnedLine, styles.earnedLineFlexBox]}>
                  <Text style={styles.earned}>{`Completed `}</Text>
                  <Text style={styles.textTypo2}>{`Drive-Thru `}</Text>
                </Text>
                <Text style={[styles.dateCompleted, styles.earnedLineFlexBox]}>
                  May 1, 2022 • 5/10 Correct
                </Text>
              </View>
            </View>
            <View style={styles.property1preTestFlexBox}>
              <Image
                style={styles.medalsIcon3}
                contentFit="cover"
                source={require("../assets/goldmedal.jpg")}
              />
              <View style={styles.historyText2}>
                <Text style={[styles.earnedLine, styles.earnedLineFlexBox]}>
                  <Text style={styles.earned}>{`Earned `}</Text>
                  <Text style={styles.textTypo2}>Bronze</Text>
                  <Text style={styles.earned}> in</Text>
                  <Text style={styles.textTypo2}>{` Drive-Thru `}</Text>
                </Text>
                <Text style={[styles.dateCompleted, styles.earnedLineFlexBox]}>
                  May 1, 2022 • 8/10 Correct
                </Text>
              </View>
            </View>
            <View style={styles.property1preTestFlexBox}>
              
              <View style={styles.historyText3}>
                <Text style={[styles.earnedLine, styles.earnedLineFlexBox]}>
                  <Text style={styles.earned}>{`Earned `}</Text>
                  <Text style={styles.textTypo2}>Silver</Text>
                  <Text style={styles.earned}> in</Text>
                  <Text style={styles.textTypo2}>{` Drive-Thru `}</Text>
                </Text>
                <Text style={[styles.dateCompleted, styles.earnedLineFlexBox]}>
                  May 1, 2022 • 9/10 Correct
                </Text>
              </View>
            </View>
            <View style={styles.property1preTestFlexBox}>
             
              <View style={styles.historyText3}>
                <Text style={[styles.earnedLine, styles.earnedLineFlexBox]}>
                  <Text style={styles.earned}>{`Earned `}</Text>
                  <Text style={styles.textTypo2}>Gold</Text>
                  <Text style={styles.earned}> in</Text>
                  <Text style={styles.textTypo2}>{` Drive-Thru `}</Text>
                </Text>
                <Text style={[styles.dateCompleted, styles.earnedLineFlexBox]}>
                  May 1, 2022 • 10/10 Correct
                </Text>
              </View>
            </View>
            <View style={styles.property1preTestFlexBox}>
             
              <View style={styles.historyText5}>
                <Text style={[styles.earnedLine, styles.earnedLineFlexBox]}>
                  <Text style={styles.earned}>{`Earned `}</Text>
                  <Text style={styles.textTypo2}>Gold</Text>
                  <Text style={styles.earned}> in</Text>
                  <Text style={styles.textTypo2}>{` Drive-Thru 101: `}</Text>
                </Text>
                <Text style={[styles.dateCompleted, styles.earnedLineFlexBox]}>
                  May 1, 2022 • 5/7 Correct
                </Text>
              </View>
            </View>
            <View
              style={[styles.property1preTest, styles.property1preTestFlexBox]}
            >
              <Image
                style={styles.progressBarStatesprepostT}
                contentFit="cover"
                source={require("../assets/completdtick.jpg")}
              />
              <View style={styles.historyText6}>
                <Text style={[styles.earnedLine, styles.earnedLineFlexBox]}>
                  <Text style={styles.earned}>Completed Pre-Test in</Text>
                  <Text style={styles.textTypo2}> Customer Experience 101</Text>
                </Text>
                <Text style={[styles.dateCompleted, styles.earnedLineFlexBox]}>
                  May 1, 2022 • 5/7 Correct
                </Text>
              </View>
            </View>
            <View
              style={[styles.property1preTest, styles.property1preTestFlexBox]}
            >
              <Image
                style={styles.progressBarStatesprepostT}
                contentFit="cover"
                source={require("../assets/completdtick.jpg")}
              />
              <View style={styles.historyText6}>
                <Text style={[styles.earnedLine, styles.earnedLineFlexBox]}>
                  <Text style={styles.earned}>Completed Pre-Test in</Text>
                  <Text style={styles.textTypo2}> Customer Experience 101</Text>
                </Text>
                <Text style={[styles.dateCompleted, styles.earnedLineFlexBox]}>
                  May 1, 2022 • 5/7 Correct
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
        )
      default:
        return null
    }
  }

  return (
    <View style={styles.cover}>
      <View style={styles.tabsContainer}>
        <TouchableOpacity onPress={() => setActiveScreen('stats')}>
          <Text style={styles.tabText}>STATS</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveScreen('achievements')}>
          <Text style={styles.tabText}>ACHIEVEMENTS</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveScreen('activity')}>
          <Text style={styles.tabText}>ACTIVITY</Text>
        </TouchableOpacity>
      </View>
      {renderScreen()}
    </View>
  );
  
};



const styles = StyleSheet.create({
  feedShadowBox1: {
    height: 600,
    width: 497,
    borderWidth: 16.1,
    borderColor: Color.colorGray_500,
    backgroundColor: Color.colorWhitesmoke_100,
    borderRadius: 62,
    elevation: 127,
    shadowRadius: 127,
    shadowColor: "rgba(0, 0, 0, 0.39)",
    top: 179,
    overflow: "hidden",
    borderStyle: "solid",
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 74.3135757446289,
    },
    position: "absolute",
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    padding: 20,
  },
  tabText: {
    fontSize: 20,
    color: "#000",
  },
  groupWrapperLayout: {
    width: 194,
    height: 84,
    position: "absolute",
  },
  groupParentPosition: {
    left: "0%",
    position: "absolute",
  },
  groupPosition1: {
    right: "0%",
    left: "0%",
    bottom: "0%",
    position: "absolute",
    width: "100%",
  },
  quizzesTypo: {
    width: 116,
    height: 38,
    textAlign: "left",
    fontFamily: FontFamily.body2Emphasized,
    fontWeight: "600",
  },
  iconGroupLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
  },
  textLayout: {
    lineHeight: 27,
    fontSize: FontSize.size_2xl_1,
  },
  iconLayout1: {
    width: 20,
    height: 20,
    top: 32,
  },
  medals53Position: {
    left: 32,
    position: "absolute",
  },
  borderPosition: {
    borderWidth: 1.2,
    top: 0,
    position: "absolute",
  },
  timeTypo: {
    textAlign: "center",
    letterSpacing: 0,
    fontFamily: FontFamily.body2Emphasized,
    fontWeight: "600",
    position: "absolute",
  },
  feedShadowBox: {
    elevation: 16.1,
    shadowRadius: 16.1,
    shadowColor: "#fafbff",
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 74.3135757446289,
    },
  },
  groupParentShadowBox1: {
    width: "82.28%",
    height: "23.39%",
    elevation: 16.1,
    shadowRadius: 16.1,
    shadowColor: "#fafbff",
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 74.3135757446289,
    },
    position: "absolute",
  },
  rectangleParentLayout1: {
    height: 41,
    width: 352,
  },
  groupChild4Layout: {
    height: 40,
    width: 50,
    borderRadius: 7,
    left: 0,
    position: "absolute",
  },
  adjustablePosition: {
    backgroundColor: Color.gradientFlubber,
    borderRadius: 124,
    opacity: 0.2,
    bottom: "0%",
    overflow: "hidden",
    position: "absolute",
  },
  progressLayout4: {
    height: 12,
    width: 70,
    top: "50%",
    position: "absolute",
  },
  progressPosition: {
    marginTop: -6.2,
    backgroundColor: Color.gradientFlubber,
    borderRadius: 124,
    left: 0,
  },
  textPosition: {
    height: 15,
    width: 92,
    textAlign: "right",
    top: "50%",
    right: 0,
    fontSize: FontSize.size_mini_9,
    position: "absolute",
  },
  topicPosition1: {
    top: "50%",
    position: "absolute",
  },
  progressLayout3: {
    width: 90,
    height: 12,
    top: "50%",
    position: "absolute",
  },
  topicsTypo: {
    height: 21,
    width: 221,
    fontSize: FontSize.size_mini_9,
    textAlign: "left",
    fontFamily: FontFamily.body2Emphasized,
    fontWeight: "600",
  },
  rectangleParentPosition: {
    left: 30,
    position: "absolute",
  },
  progressLayout2: {
    width: 159,
    height: 12,
    top: "50%",
    position: "absolute",
  },
  progressLayout1: {
    width: 169,
    height: 12,
    top: "50%",
    position: "absolute",
  },
  progressLayout: {
    width: 149,
    height: 12,
    top: "50%",
    position: "absolute",
  },
  groupParentShadowBox: {
    height: 103,
    width: 464,
    elevation: 34.68,
    shadowRadius: 34.68,
    shadowColor: "rgba(31, 78, 198, 0.1)",
    left: 0,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 74.3135757446289,
    },
    position: "absolute",
  },
  groupParentLayout: {
    height: 31,
    position: "absolute",
  },
  topicLayout: {
    lineHeight: 22,
    fontSize: FontSize.size_mid_3,
  },
  textTypo2: {
    fontFamily: FontFamily.body2Emphasized,
    fontWeight: "600",
  },
  iconLayout: {
    bottom: "51.85%",
    top: "19.26%",
    width: "6.39%",
    height: "28.89%",
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
    position: "absolute",
  },
  achievementsTypo: {
    left: 105,
    top: 9,
    letterSpacing: 1,
    textAlign: "center",
    fontSize: FontSize.size_mini_9,
    fontFamily: FontFamily.body2Emphasized,
    fontWeight: "600",
    position: "absolute",
  },
  activityTypo: {
    left: 274,
    top: 9,
    letterSpacing: 1,
    textAlign: "center",
    fontSize: FontSize.size_mini_9,
    fontFamily: FontFamily.body2Emphasized,
    fontWeight: "600",
    position: "absolute",
  },
  statsTypo: {
    top: 9,
    textShadowRadius: 18.58,
    textShadowOffset: {
      width: 0,
      height: 4.954238414764404,
    },
    textShadowColor: "rgba(115, 80, 255, 0.2)",
    letterSpacing: 1,
    textAlign: "center",
    fontSize: FontSize.size_mini_9,
    fontFamily: FontFamily.body2Emphasized,
    fontWeight: "600",
    left: 0,
    position: "absolute",
  },
  lineViewLayout: {
    height: 37,
    width: 1,
    borderRightWidth: 1.2,
    borderColor: Color.colorWhitesmoke_300,
    top: -1,
    borderStyle: "solid",
    position: "absolute",
  },
  medallionShadowBox: {
    height: 190,
    width: 171,
    top: 640,
    elevation: 16.1,
    shadowRadius: 16.1,
    shadowColor: "#fafbff",
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 74.3135757446289,
    },
    position: "absolute",
  },
  labelsLayout: {
    width: "26.68%",
    position: "absolute",
  },
  labelsPosition: {
    borderRadius: 10,
    right: "0%",
    left: "0%",
    top: "0%",
    position: "absolute",
    width: "100%",
  },
  certifiedPosition: {
    left: "1.89%",
    width: "96.3%",
  },
  cryptocurrencyTypo: {
    left: "10.55%",
    top: "45.17%",
    width: "79.01%",
    height: "26.17%",
    textAlign: "center",
    fontSize: FontSize.size_mini_9,
    letterSpacing: 0,
    color: Color.baseShade100,
    fontFamily: FontFamily.body2Emphasized,
    fontWeight: "600",
    position: "absolute",
  },
  medallionsIconPosition: {
    left: "35.69%",
    bottom: "61.48%",
    right: "35.75%",
    top: "12.4%",
    width: "28.55%",
    height: "26.12%",
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
    position: "absolute",
  },
  groupWrapper9Layout: {
    height: 551,
    width: 411,
    position: "absolute",
  },
  aceTypo: {
    height: 19,
    width: 104,
    fontSize: FontSize.size_sm_6,
    top: 180,
    textAlign: "center",
    lineHeight: 25,
    letterSpacing: 0,
    color: Color.baseShade100,
    fontFamily: FontFamily.body2Emphasized,
    fontWeight: "600",
    position: "absolute",
  },
  passed500Typo: {
    height: 26,
    lineHeight: 14,
    fontSize: FontSize.size_smi_4,
    top: 207,
    width: 104,
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
    textAlign: "center",
    color: Color.colorGrey,
    letterSpacing: 0,
    position: "absolute",
  },
  quizContainerTypo: {
    left: 87,
    width: 218,
    fontSize: FontSize.size_mini_9,
    letterSpacing: 0,
    height: 38,
    textAlign: "left",
    fontFamily: FontFamily.body2Emphasized,
    fontWeight: "600",
    position: "absolute",
  },
  the500ContainerTypo: {
    width: 281,
    left: 87,
    fontSize: FontSize.size_mini_9,
    letterSpacing: 0,
    height: 38,
    textAlign: "left",
    fontFamily: FontFamily.body2Emphasized,
    fontWeight: "600",
    position: "absolute",
  },
  almostTypo: {
    width: 244,
    left: 87,
    fontSize: FontSize.size_mini_9,
    letterSpacing: 0,
    textAlign: "left",
    fontFamily: FontFamily.body2Emphasized,
    fontWeight: "600",
    position: "absolute",
  },
  goldContainerTypo: {
    width: 276,
    left: 87,
    fontSize: FontSize.size_mini_9,
    letterSpacing: 0,
    height: 38,
    textAlign: "left",
    fontFamily: FontFamily.body2Emphasized,
    fontWeight: "600",
    position: "absolute",
  },
  badges1Position: {
    left: 22,
    display: "none",
    position: "absolute",
  },
  groupChildLayout: {
    right: "83%",
    width: "13.72%",
    height: "10.32%",
    left: "3.28%",
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
    position: "absolute",
  },
  text28Typo: {
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
    color: Color.baseShade30,
  },
  rectangleParentShadowBox: {
    bottom: "44.15%",
    top: "43.2%",
    height: "12.65%",
    elevation: 16.1,
    shadowRadius: 16.1,
    shadowColor: "#fafbff",
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 74.3135757446289,
    },
    position: "absolute",
  },
  groupChildPosition: {
    opacity: 0.15,
    left: 46,
    height: 24,
    top: 92,
    borderRadius: 7,
    width: 35,
    position: "absolute",
  },
  textTypo1: {
    left: "9.91%",
    width: "80.18%",
    top: "71.67%",
    height: "14.17%",
    textAlign: "center",
    fontSize: FontSize.size_mini_9,
    letterSpacing: 0,
    fontFamily: FontFamily.body2Emphasized,
    fontWeight: "600",
    position: "absolute",
  },
  goldTypo: {
    top: "47.14%",
    height: "29.25%",
    textAlign: "center",
    fontSize: FontSize.size_mini_9,
    letterSpacing: 0,
    color: Color.baseShade100,
    fontFamily: FontFamily.body2Emphasized,
    fontWeight: "600",
    position: "absolute",
  },
  feedChildLayout: {
    bottom: "51.67%",
    top: "44.99%",
    width: "6.99%",
    height: "3.34%",
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
    position: "absolute",
  },
  rectanglePosition: {
    left: 29,
    position: "absolute",
  },
  groupPosition: {
    left: "6.07%",
    position: "absolute",
  },
  ellipseIconPosition: {
    bottom: "10.22%",
    top: "9.95%",
    width: "8.35%",
    height: "79.84%",
    position: "absolute",
  },
  textTypo: {
    color: Color.colorSaddlebrown,
    fontSize: FontSize.size_mini_9,
    letterSpacing: 0,
    textAlign: "left",
    fontFamily: FontFamily.body2Emphasized,
    fontWeight: "600",
    position: "absolute",
  },
  silverTypo: {
    color: Color.colorSlategray_100,
    textAlign: "center",
    fontSize: FontSize.size_mini_9,
    letterSpacing: 0,
    fontFamily: FontFamily.body2Emphasized,
    fontWeight: "600",
    position: "absolute",
  },
  earnedLineFlexBox: {
    alignSelf: "stretch",
    textAlign: "left",
  },
  property1preTestFlexBox: {
    marginTop: 28.5,
    alignItems: "center",
    flexDirection: "row",
    width: 415,
  },
  text: {
    color: Color.baseShade100,
  },
  text3: {
    fontSize: FontSize.size_lgi_8,
    lineHeight: 25,
    letterSpacing: 0,
  },
  quizzes1: {
    color: Color.colorGrey,
    fontSize: FontSize.size_mini_9,
    letterSpacing: 0,
  },
  quizzes: {
    left: 77,
    height: 38,
    top: 20,
    position: "absolute",
  },
  recall: {
    borderRadius: 25,
    backgroundColor: Color.fFFFFF,
    top: "0%",
    height: "100%",
  },
  groupContainer: {
    top: "0%",
    height: "100%",
  },
  groupChild: {
    width: "17.51%",
    right: "71.85%",
    left: "10.65%",
    bottom: "29.33%",
    top: "29.45%",
    height: "41.21%",
    maxWidth: "100%",
    position: "absolute",
  },
  groupParent: {
    width: "101.9%",
    right: "-1.9%",
    bottom: "0%",
    left: "0%",
    top: "0%",
    height: "100%",
  },
  groupWrapper: {
    left: 0,
    top: 0,
  },
  text4: {
    color: Color.baseShade100,
  },
  leaderboard: {
    left: 74,
    height: 38,
    top: 20,
    position: "absolute",
  },
  iconLeaderboard: {
    height: 20,
    left: 27,
    width: 20,
    position: "absolute",
    overflow: "hidden",
  },
  iconLeaderboard1: {
    height: 20,
    width: 20,
    top: 32,
    overflow: "hidden",
  },
  recallChild: {
    height: 20,
    left: 27,
    width: 20,
    position: "absolute",
  },
  groupItem: {
    width: "17.47%",
    right: "72.53%",
    left: "10%",
    opacity: 0.2,
    maxHeight: "100%",
    maxWidth: "100%",
    bottom: "29.33%",
    top: "29.45%",
    height: "41.21%",
    overflow: "hidden",
    position: "absolute",
  },
  groupParent1: {
    width: "101.8%",
    right: "-1.8%",
    bottom: "0%",
    left: "0%",
    top: "0%",
    height: "100%",
  },
  groupWrapper1: {
    left: 214,
    top: 0,
  },
  frameParent: {
    top: 255,
    height: 84,
    width: 409,
    elevation: 16.1,
    shadowRadius: 16.1,
    shadowColor: "#fafbff",
    left: 26,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 74.3135757446289,
    },
    position: "absolute",
  },
  aryaMuller: {
    top: "14.56%",
    left: "32.68%",
    fontSize: FontSize.size_5xl_8,
    fontWeight: "700",
    fontFamily: FontFamily.interBold,
    color: Color.baseShade100,
    textAlign: "left",
    position: "absolute",
  },
  photoAlice: {
    height: "6.92%",
    width: "14.46%",
    top: "6.69%",
    right: "45.9%",
    bottom: "86.4%",
    left: "39.64%",
    position: "absolute",
  },
  iconSettings: {
    height: "2.86%",
    width: "5.98%",
    top: "6.45%",
    right: "10.49%",
    bottom: "90.69%",
    left: "83.53%",
    opacity: 0.4,
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
    position: "absolute",
  },
  border: {
    right: 3,
    borderRadius: Border.br_9xs_3,
    borderColor: Color.baseShade100,
    width: 27,
    opacity: 0.35,
    height: 14,
    borderStyle: "solid",
  },
  capIcon: {
    top: 5,
    width: 2,
    height: 5,
    right: 0,
    opacity: 0.4,
    position: "absolute",
  },
  capacity: {
    top: 3,
    right: 5,
    borderRadius: 2,
    width: 22,
    height: 9,
    backgroundColor: Color.baseShade100,
    position: "absolute",
  },
  
  time: {
    fontSize: FontSize.size_lg_6,
    width: 67,
    lineHeight: 25,
    color: Color.baseShade100,
    top: 20,
    left: 26,
  },
  iconLeaderboard2: {
    display: "none",
    height: 20,
    left: 27,
    width: 20,
    position: "absolute",
    overflow: "hidden",
  },
  recallItem: {
    height: 35,
    width: 35,
    left: 25,
    top: 25,
    position: "absolute",
  },
  feedTurnedOnInner: {
    height: "8.11%",
    width: "39.9%",
    top: "34.13%",
    right: "11.72%",
    bottom: "57.76%",
    left: "48.38%",
    position: "absolute",
  },
  groupInner: {
    right: "0%",
    left: "0%",
    bottom: "0%",
    position: "absolute",
    width: "100%",
    top: "0%",
    height: "100%",
  },
  rectangleIcon: {
    top: 1,
  },
  topicName: {
    width: 206,
    left: 66,
    top: "50%",
    marginTop: -20.45,
    fontSize: FontSize.size_mini_9,
    letterSpacing: 0,
    color: Color.baseShade100,
    textAlign: "left",
    fontFamily: FontFamily.body2Emphasized,
    fontWeight: "600",
    position: "absolute",
  },
  adjustableProgressBar: {
    height: "30.32%",
    width: "52.1%",
    top: "69.68%",
    right: "29.25%",
    left: "18.65%",
  },
  progress: {
    height: 12,
    width: 70,
    top: "50%",
    position: "absolute",
  },
  progressWrapper: {
    left: 65,
    marginTop: 8.05,
  },
  text10: {
    color: Color.colorGray_100,
  },
  correct: {
    color: Color.baseShade30,
  },
  text9: {
    marginTop: 3.15,
    letterSpacing: 0,
    fontFamily: FontFamily.body2Emphasized,
    fontWeight: "600",
  },
  rectangleParent: {
    top: 98,
    left: 29,
    position: "absolute",
  },
  topicName1: {
    width: 119,
    left: 65,
    marginTop: -20.45,
    top: "50%",
    fontSize: FontSize.size_mini_9,
    letterSpacing: 0,
    color: Color.baseShade100,
    textAlign: "left",
    fontFamily: FontFamily.body2Emphasized,
    fontWeight: "600",
  },
  text11: {
    marginTop: 3.05,
    letterSpacing: 0,
    fontFamily: FontFamily.body2Emphasized,
    fontWeight: "600",
  },
  rectangleGroup: {
    top: 26,
    left: 29,
    position: "absolute",
  },
  topicName2: {
    width: 218,
    left: 66,
    top: "50%",
    marginTop: -20.45,
    fontSize: FontSize.size_mini_9,
    letterSpacing: 0,
    color: Color.baseShade100,
    textAlign: "left",
    fontFamily: FontFamily.body2Emphasized,
    fontWeight: "600",
    position: "absolute",
  },
  progress2: {
    marginTop: -6.2,
    backgroundColor: Color.gradientFlubber,
    borderRadius: 124,
    left: 0,
  },
  progressFrame: {
    left: 65,
    marginTop: 8.05,
  },
  rectangleContainer: {
    top: 170,
    left: 29,
    position: "absolute",
  },
  groupParent2: {
    top: "47.97%",
    right: "12.48%",
    bottom: "28.63%",
    left: "5.23%",
  },
  strongestTopics: {
    top: 465,
    left: 31,
    width: 221,
    color: Color.colorGrey,
    position: "absolute",
  },
  weakestTopics: {
    top: 772,
    left: 31,
    width: 221,
    color: Color.colorGrey,
    position: "absolute",
  },
  stats: {
    fontWeight: "800",
    fontFamily: FontFamily.interExtraBold,
    textShadowRadius: 18.58,
    textShadowOffset: {
      width: 0,
      height: 4.954238414764404,
    },
    textShadowColor: "rgba(115, 80, 255, 0.2)",
    letterSpacing: 1,
    width: 66,
    textAlign: "center",
    height: 20,
    fontSize: FontSize.size_mini_9,
    left: 0,
    top: 0,
    position: "absolute",
  },
  statsWrapper: {
    top: 1043,
    width: 66,
    elevation: 34.68,
    shadowRadius: 34.68,
    shadowColor: "rgba(31, 78, 198, 0.1)",
    left: 32,
    height: 20,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 74.3135757446289,
    },
    position: "absolute",
  },
  progress3: {
    marginTop: -6.2,
    backgroundColor: Color.gradientFlubber,
    borderRadius: 124,
    left: 0,
  },
  progressWrapper1: {
    left: 65,
    marginTop: 8.05,
  },
  rectangleParent1: {
    top: 100,
    height: 41,
    width: 352,
  },
  groupChild4: {
    top: 0,
  },
  topicName4: {
    marginTop: -18.5,
    left: 71,
    width: 286,
    fontSize: FontSize.size_mini_9,
    letterSpacing: 0,
    color: Color.baseShade100,
    textAlign: "left",
    fontFamily: FontFamily.body2Emphasized,
    fontWeight: "600",
  },
  adjustableProgressBar4: {
    height: "27.8%",
    width: "51.39%",
    top: "72.2%",
    right: "28.82%",
    left: "19.79%",
  },
  progress4: {
    marginTop: -6.2,
    backgroundColor: Color.gradientFlubber,
    borderRadius: 124,
    left: 0,
  },
  progressWrapper2: {
    marginTop: 9.9,
    left: 70,
  },
  text17: {
    marginTop: 5,
    letterSpacing: 0,
    fontFamily: FontFamily.body2Emphasized,
    fontWeight: "600",
  },
  rectangleParent2: {
    width: 357,
    height: 45,
    left: 25,
    top: 25,
    position: "absolute",
  },
  progress5: {
    marginTop: -6.2,
    backgroundColor: Color.gradientFlubber,
    borderRadius: 124,
    left: 0,
  },
  progressWrapper3: {
    left: 65,
    marginTop: 8.05,
  },
  rectangleParent3: {
    top: 172,
    height: 41,
    width: 352,
  },
  groupParent3: {
    top: "77.57%",
    right: "12.72%",
    bottom: "-0.96%",
    left: "4.99%",
  },
  recallInner: {
    width: "17.53%",
    right: "69.8%",
    left: "12.68%",
    bottom: "29.33%",
    top: "29.45%",
    height: "41.21%",
    maxWidth: "100%",
    position: "absolute",
  },
  feedTurnedOnChild: {
    top: 354,
    elevation: 16.1,
    shadowRadius: 16.1,
    shadowColor: "#fafbff",
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 74.3135757446289,
    },
    left: 26,
  },
  groupChild6: {
    width: 31,
    left: 0,
    top: 0,
  },
  topicName6: {
    width: 188,
    marginTop: -11.5,
    fontSize: FontSize.size_mid_3,
    top: "50%",
    color: Color.baseShade100,
    textAlign: "left",
    fontFamily: FontFamily.body2Emphasized,
    fontWeight: "600",
    left: 0,
    position: "absolute",
  },
  text23: {
    letterSpacing: 0,
  },
  text22: {
    marginTop: -7.8,
  },
  topicNameParent: {
    marginTop: -11.9,
    left: 42,
    width: 334,
    height: 23,
  },
  groupParent5: {
    top: 12,
    width: 377,
    left: 41,
    height: 31,
  },
  topicName7: {
    width: 204,
    marginTop: -11.5,
    fontSize: FontSize.size_mid_3,
    top: "50%",
    color: Color.baseShade100,
    textAlign: "left",
    fontFamily: FontFamily.body2Emphasized,
    fontWeight: "600",
    left: 0,
    position: "absolute",
  },
  text24: {
    marginTop: -9,
  },
  groupParent6: {
    width: 377,
    left: 41,
    height: 31,
    top: 26,
  },
  homeIndicator: {
    marginLeft: -83.05,
    bottom: 10,
    left: "50%",
    width: 166,
    height: 6,
    borderRadius: 124,
    backgroundColor: Color.baseShade100,
    position: "absolute",
  },
  iosIphoneXsLight: {
    height: "40.95%",
    top: "59.05%",
  },
  iconTabProfileOff: {
    right: "6.42%",
    left: "87.19%",
  },
  iconTabNotificationsOn: {
    right: "26.67%",
    left: "66.93%",
  },
  iconTabPlayOff: {
    height: "62.65%",
    width: "13.86%",
    top: "2.43%",
    right: "42.95%",
    bottom: "34.92%",
    left: "43.19%",
    display: "none",
    position: "absolute",
  },
  iconTabLearnOn: {
    right: "68.01%",
    left: "25.6%",
  },
  iconTabTalkOff: {
    right: "87.21%",
    left: "6.39%",
  },
  iconTabSelected: {
    height: "7.2%",
    width: "1.59%",
    top: "60.21%",
    right: "8.81%",
    bottom: "32.59%",
    left: "89.6%",
    position: "absolute",
  },
  bottomShadowBox: {
    elevation: 4.95,
    shadowRadius: 4.95,
    shadowColor: "rgba(0, 0, 0, 0.12)",
    right: "0%",
    left: "0%",
    bottom: "0%",
    top: "0%",
    height: "100%",
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 74.3135757446289,
    },
    position: "absolute",
    width: "100%",
  },
  iconavplayCircleFilled24p: {
    width: 54,
    height: 54,
  },
  pathIcon: {
    height: "33.46%",
    width: "4.46%",
    top: "21.4%",
    right: "47.9%",
    bottom: "45.14%",
    left: "47.64%",
    position: "absolute",
  },
  groupParent4: {
    top: 903,
    height: 103,
    width: 464,
  },
  achievements: {
    color: "#9e9fa1",
  },
  activity: {
    color: Color.colorGray_200,
  },
  stats1: {
    color: "#587eff",
  },
  lineView: {
    left: 65,
  },
  groupChild8: {
    left: 246,
  },
  achievementsParent: {
    top: 199,
    left: 64,
    width: 349,
    height: 36,
    position: "absolute",
  },
  feedTurnedOn: {
    left: 0,
    overflow: "hidden",
  },
  medals: {
    color: Color.colorGrey,
  },
  text26: {
    color: Color.colorLightslategray_100,
  },
  medals53: {
    top: 417,
    left: 32,
    position: "absolute",
    letterSpacing: 0,
  },
  rectangleParent4: {
    width: "101.46%",
    right: "-1.46%",
    bottom: "0%",
    left: "0%",
    top: "0%",
    height: "100%",
  },
  groupChild9: {
    borderRadius: 12,
    backgroundColor: Color.colorGoldenrod_100,
    opacity: 0.1,
    top: "0%",
    height: "100%",
  },
  goldCertified: {
    color: Color.colorGoldenrod_200,
    fontSize: FontSize.size_mini_9,
    letterSpacing: 0,
    textAlign: "left",
    left: "0%",
    position: "absolute",
    top: "0%",
    height: "100%",
    width: "100%",
  },
  goldCertifiedWrapper: {
    height: "63.17%",
    width: "83.46%",
    top: "22.16%",
    right: "8.44%",
    bottom: "14.67%",
    left: "8.11%",
    position: "absolute",
  },
  rectangleParent5: {
    height: "17.63%",
    width: "70.74%",
    top: "73.88%",
    right: "13.52%",
    bottom: "8.5%",
    left: "15.74%",
    display: "none",
    position: "absolute",
  },
  medallionTile: {
    left: 410,
  },
  labelsChild: {
    height: "104.78%",
    bottom: "-4.78%",
    backgroundColor: Color.colorTan,
  },
  bronzeCertified: {
    height: "76.47%",
    top: "14.34%",
    fontSize: FontSize.body2Emphasized_size,
    color: Color.colorDarkgray_100,
    textAlign: "center",
    letterSpacing: 0,
    fontFamily: FontFamily.body2Emphasized,
    fontWeight: "600",
    position: "absolute",
  },
  labels: {
    height: "2.62%",
    top: "75.42%",
    right: "-14.19%",
    bottom: "21.96%",
    left: "87.52%",
  },
  certifications8: {
    top: 607,
    height: 21,
    width: 221,
    fontSize: FontSize.size_mini_9,
    textAlign: "left",
    fontFamily: FontFamily.body2Emphasized,
    fontWeight: "600",
  },
  foodSafetyProtocols: {
    height: "24.49%",
    width: "78.98%",
    top: "45.75%",
    left: "10.86%",
    fontSize: FontSize.size_mini_9,
    color: Color.baseShade100,
  },
  rectangleParent6: {
    height: "107%",
    width: "100.76%",
    right: "-0.76%",
    bottom: "-7%",
    top: "0%",
  },
  labels1: {
    height: "15.36%",
    width: "77.53%",
    top: "80.41%",
    right: "10.88%",
    bottom: "4.23%",
    left: "11.59%",
    position: "absolute",
  },
  medallionsIcon1: {
    height: "27.95%",
    width: "28.96%",
    top: "10.5%",
    right: "35.52%",
    bottom: "61.55%",
    left: "35.52%",
    position: "absolute",
  },
  medallionTile1: {
    height: 177,
    width: 171,
    top: 640,
    left: 29,
    elevation: 16.1,
    shadowRadius: 16.1,
    shadowColor: "#fafbff",
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 74.3135757446289,
    },
    position: "absolute",
  },
  cryptocurrencyBasics1: {
    display: "none",
  },
  medallionsIcon2: {
    display: "none",
  },
  medallionTile2: {
    left: 219,
  },
  facilitiesMaintenance: {
    height: "4.47%",
    width: "27.18%",
    top: "70.05%",
    left: "48.62%",
    fontSize: FontSize.size_mini_9,
    color: Color.baseShade100,
  },
  badges: {
    top: 847,
    left: 33,
    width: 217,
    height: 20,
    color: Color.colorGrey,
    fontSize: FontSize.size_mini_9,
    letterSpacing: 0,
    textAlign: "left",
    position: "absolute",
  },
  quizGenius: {
    left: 11,
  },
  ace: {
    left: 156,
  },
  almostPerfect: {
    left: 300,
  },
  passed500Quizzes: {
    left: 11,
  },
  earnedPerfectScores: {
    left: 155,
  },
  passed500Quizzes1: {
    left: 300,
  },
  quizGeniusPassedContainer: {
    top: 89,
    display: "none",
  },
  aceEarnedPerfectContainer: {
    top: 167,
    display: "none",
  },
  the500ClubContainer: {
    top: 323,
    opacity: 0.3,
    display: "none",
  },
  almostPerfectScoredContainer: {
    top: 245,
    opacity: 0.3,
    display: "none",
    height: 38,
  },
  goldStandardScoreContainer: {
    top: 401,
    opacity: 0.3,
    display: "none",
  },
  bronzStandardScoreContainer: {
    top: 474,
  },
  badges1: {
    top: 22,
    lineHeight: 27,
    fontSize: FontSize.size_2xl_1,
    color: Color.baseShade100,
    height: 38,
    width: 116,
    textAlign: "left",
    fontFamily: FontFamily.body2Emphasized,
    fontWeight: "600",
  },
  recallChild1: {
    top: 63,
    borderColor: Color.colorWhitesmoke_200,
    borderTopWidth: 1.2,
    width: 367,
    height: 1,
    borderStyle: "solid",
  },
  badgesAllTimeLeaderboard: {
    height: "10.34%",
    width: "13.42%",
    top: "84.94%",
    right: "83.29%",
    bottom: "4.72%",
    left: "3.28%",
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
    position: "absolute",
  },
  groupChild13: {
    top: "14.6%",
    bottom: "75.07%",
    display: "none",
  },
  groupChild14: {
    top: "28.77%",
    bottom: "60.9%",
    display: "none",
  },
  groupChild15: {
    top: "57.08%",
    bottom: "32.6%",
    opacity: 0.3,
    display: "none",
  },
  groupChild16: {
    top: "42.92%",
    bottom: "46.75%",
    opacity: 0.3,
    display: "none",
  },
  groupChild17: {
    top: "71.24%",
    bottom: "18.43%",
    opacity: 0.3,
    display: "none",
  },
  groupWrapper10: {
    shadowColor: "rgba(14, 39, 105, 0.05)",
    shadowRadius: 14.86,
    elevation: 14.86,
    top: "0%",
    height: "100%",
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 74.3135757446289,
    },
    right: "0%",
  },
  groupWrapper9: {
    left: 0,
    top: 0,
  },
  scored90Or1: {
    top: 211,
    color: Color.colorGrey,
    height: 38,
  },
  quizGeniusPassedContainer1: {
    top: 32,
    left: 87,
  },
  aceEarnedPerfectContainer1: {
    top: 110,
  },
  the500ClubContainer1: {
    top: 202,
    opacity: 0.3,
  },
  almostPerfect2: {
    top: 182,
    height: 16,
    color: Color.baseShade100,
  },
  goldStandardScoreContainer1: {
    top: 273,
    opacity: 0.3,
  },
  groupChild18: {
    top: "4.26%",
    bottom: "85.41%",
  },
  groupChild19: {
    top: "18.43%",
    bottom: "71.24%",
  },
  groupChild20: {
    top: "33.71%",
    bottom: "55.97%",
    opacity: 0.3,
  },
  groupChild21: {
    top: "33.04%",
    bottom: "56.64%",
  },
  groupChild22: {
    top: "47.86%",
    bottom: "41.82%",
    opacity: 0.3,
  },
  text28: {
    height: "4.5%",
    width: "18.97%",
    top: "36.63%",
    left: "39.76%",
    textAlign: "right",
    fontWeight: "500",
    fontSize: FontSize.size_mini_9,
    position: "absolute",
  },
  vectorIcon: {
    height: "2.01%",
    width: "3.02%",
    top: "35.96%",
    right: "37.35%",
    bottom: "62.03%",
    left: "59.63%",
    opacity: 0.3,
    position: "absolute",
  },
  quizGeniusParent: {
    top: 878,
    elevation: 16.1,
    shadowRadius: 16.1,
    shadowColor: "#fafbff",
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 74.3135757446289,
    },
    left: 26,
  },
  groupParent7: {
    top: 903,
    height: 103,
    width: 464,
  },
  groupChild26: {
    backgroundColor: "#eab021",
  },
  text33: {
    color: "#edb552",
  },
  gold: {
    width: "94.32%",
    left: "2.96%",
  },
  medalsIcon: {
    height: "26.43%",
    width: "27.74%",
    top: "14.17%",
    right: "36.61%",
    bottom: "59.41%",
    left: "35.65%",
    position: "absolute",
  },
  rectangleParent9: {
    right: "69.08%",
    left: "5.74%",
    width: "25.19%",
    bottom: "44.15%",
    top: "43.2%",
    height: "12.65%",
  },
  feedTurnedOnItem: {
    right: "78.56%",
    left: "14.46%",
  },
  groupChild28: {
    left: 45,
    backgroundColor: "#eceef1",
    height: 24,
    top: 92,
    borderRadius: 7,
    width: 35,
    position: "absolute",
  },
  text34: {
    width: "80.95%",
    left: "8.96%",
    color: "#717484",
    top: "71.67%",
    height: "14.17%",
    textAlign: "center",
    fontSize: FontSize.size_mini_9,
    letterSpacing: 0,
    fontFamily: FontFamily.body2Emphasized,
    fontWeight: "600",
    position: "absolute",
  },
  silver: {
    width: "95.24%",
    left: "2.02%",
  },
  rectangleParent10: {
    width: "24.94%",
    right: "40.14%",
    left: "34.91%",
    bottom: "44.15%",
    top: "43.2%",
    height: "12.65%",
  },
  feedTurnedOnChild1: {
    right: "49.39%",
    left: "43.63%",
  },
  groupChild30: {
    backgroundColor: Color.colorRosybrown,
  },
  text35: {
    color: Color.colorRosybrown,
  },
  rectangleParent11: {
    right: "10.97%",
    left: "63.84%",
    width: "25.19%",
    bottom: "44.15%",
    top: "43.2%",
    height: "12.65%",
  },
  feedTurnedOnChild2: {
    right: "19.95%",
    left: "73.06%",
  },
  stats2: {
    color: Color.colorGrey,
  },
  ellipseIcon: {
    right: "90.62%",
    left: "1.03%",
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
  },
  text36: {
    height: "62.29%",
    width: "31%",
    top: "20.54%",
    left: "34%",
  },
  groupParent12: {
    right: "0.95%",
    left: "90.7%",
    opacity: 0.5,
  },
  text37: {
    width: "2.78%",
    top: "23.12%",
    left: "3.81%",
  },
  groupWrapper11: {
    height: "27.56%",
    width: "87.89%",
    top: "54.15%",
    right: "6.04%",
    bottom: "18.3%",
  },
  level2: {
    letterSpacing: 0,
    color: Color.baseShade100,
    textAlign: "left",
    fontFamily: FontFamily.body2Emphasized,
    fontWeight: "600",
    left: "0%",
    position: "absolute",
    top: "0%",
    height: "100%",
    width: "100%",
  },
  level2Wrapper: {
    height: "34.2%",
    width: "64.44%",
    right: "35.56%",
    bottom: "65.8%",
    top: "0%",
  },
  pointsToNext: {
    height: "35.39%",
    top: "64.61%",
    color: Color.baseShade30,
    fontSize: FontSize.size_mini_9,
    letterSpacing: 0,
    textAlign: "left",
    left: "0%",
    position: "absolute",
    width: "100%",
  },
  groupWrapper12: {
    height: "31.19%",
    width: "45.14%",
    top: "13.78%",
    right: "36.36%",
    bottom: "55.04%",
    left: "18.5%",
    position: "absolute",
  },
  text38: {
    top: "17.58%",
    left: "35.73%",
    textAlign: "left",
    fontFamily: FontFamily.body2Emphasized,
    fontWeight: "600",
    position: "absolute",
  },
  groupParent14: {
    height: "25.7%",
    width: "8.49%",
    top: "18.37%",
    right: "85.44%",
    bottom: "55.93%",
  },
  text40: {
    color: Color.colorDarkolivegreen,
  },
  text41: {
    color: Color.colorOlive,
  },
  text39: {
    width: "21.12%",
    top: "61.48%",
    left: "50.92%",
    opacity: 0.8,
    fontSize: FontSize.size_mini_9,
    letterSpacing: 0,
    textAlign: "left",
    position: "absolute",
  },
  vectorIcon1: {
    height: "8.22%",
    width: "3.03%",
    top: "63.33%",
    right: "50.6%",
    bottom: "28.44%",
    left: "46.37%",
    opacity: 0.6,
    position: "absolute",
  },
  statTileSmall: {
    top: 256,
    height: 135,
    width: 409,
    left: 29,
    elevation: 16.1,
    shadowRadius: 16.1,
    shadowColor: "#fafbff",
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 74.3135757446289,
    },
  },
  medallionsIcon3: {
    height: "4.77%",
    width: "9.97%",
    top: "63.48%",
    right: "33.68%",
    bottom: "31.75%",
    left: "56.35%",
    position: "absolute",
  },
  labelsInner: {
    height: "104.45%",
    bottom: "-4.45%",
    backgroundColor: Color.colorGray_300,
  },
  silverCertified: {
    height: "76.03%",
    top: "14.38%",
    left: "1.89%",
    width: "96.3%",
    display: "none",
  },
  labels2: {
    height: "2.81%",
    top: "75.3%",
    right: "25.21%",
    bottom: "21.89%",
    left: "48.12%",
  },
  silverCertified1: {
    height: "2.14%",
    width: "25.69%",
    top: "75.82%",
    left: "48.62%",
  },
  feedTurnedOn1: {
    right: "49.39%",
    left: "43.63%",
    overflow: "hidden",
  },
  groupParent15: {
    top: 902,
  },
  achievements2: {
    color: Color.colorGrey,
  },
  activity2: {
    color: "#6e7bfe",
  },
  stats3: {
    color: Color.colorGrey,
  },
  medallionsIcon4: {
    width: 47,
    height: 47,
  },
  earned: {
    fontFamily: FontFamily.interRegular,
  },
  earnedLine: {
    color: Color.colorDarkslategray,
    lineHeight: 22,
    fontSize: FontSize.size_mid_3,
  },
  dateCompleted: {
    lineHeight: 20,
    color: Color.colorGray_400,
    fontFamily: FontFamily.interRegular,
    fontSize: FontSize.size_mini_9,
  },
  historyText: {
    marginLeft: 16.1,
    width: 360,
  },
  property1longQuizTitle: {
    alignItems: "center",
    flexDirection: "row",
    width: 415,
  },
  medalsIcon3: {
    width: 45,
    height: 45,
  },
  historyText2: {
    width: 358,
    marginLeft: 19.8,
  },
  historyText3: {
    marginLeft: 19.8,
    width: 360,
  },
  historyText5: {
    paddingLeft: 9,
    marginLeft: 9.9,
    width: 360,
  },
  progressBarStatesprepostT: {
    width: 38,
    height: 38,
  },
  historyText6: {
    width: 348,
    paddingLeft: 17,
    paddingRight: 12,
    marginLeft: 3.7,
  },
  property1preTest: {
    paddingHorizontal: 4,
    paddingVertical: 0,
  },
  historyRow: {
    borderRadius: 6,
    borderStyle: "dashed",
    borderColor: "rgba(151, 71, 255, 0)",
    paddingLeft: 16,
    paddingTop: 25,
    paddingRight: 25,
    paddingBottom: 25,
    left: 0,
  },
  historyRowWrapper: {
    top: 248,
    left: 17,
    width: 456,
    height: 672,
    position: "absolute",
  },
  feedTurnedOn2: {
    right: "49.39%",
    left: "43.63%",
    overflow: "hidden",
  },
  cover: {
    borderRadius: 64,
    
    flex: 1,
    height: 1396,
    width: 400,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Cover;
