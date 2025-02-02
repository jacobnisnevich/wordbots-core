import { History, Location } from 'history';
import Button from '@material-ui/core/Button';
import * as React from 'react';
import IFrame from 'react-iframe';

import { markAchievement } from '../../util/firebase';
import MarkdownBlock from '../MarkdownBlock';
import RouterDialog from '../RouterDialog';

export default class CreatorHelpDialog extends React.Component<{ history: History, location: Location }> {
  public componentDidMount(): void {
    markAchievement('openedCardCreatorHelp');
  }

  public render(): JSX.Element {
    const { history, location } = this.props;
    return (
      <RouterDialog
        path="help"
        title="How to Write a Card"
        history={history}
        style={{ width: 800, overflowY: 'auto', top: 10 }}
        actions={[
          <Button
            key="Close"
            color="primary"
            variant="contained"
            onClick={this.handleClose}
          >
            Close
          </Button>
        ]}
      >
        <div className="markdownBlock">
          <h2>Video Tutorial</h2>
          <IFrame
            position="relative"
            url="https://www.youtube.com/embed/GeZwKIOKc1c?rel=0"
            width="708"
            height="444"
            frameborder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>
        <MarkdownBlock source={helpText(location)} />
      </RouterDialog>
    );
  }

  private handleClose = () => { RouterDialog.closeDialog(this.props.history); };
}

export const helpText = (location: Location): string => `
## Types of Cards

* A **robot** card must played adjacent to your kernel, and can move, attack, and activate.
* A **structure** card can be played adjacent to your kernel, robots, or structures, and can activate but not move or attack.
* An **action** card performs some action and is immediately discarded.

## Types of Sentences

In a nutshell:

* **Action**: "Give a robot +1 health."
* **Passive ability**: "Your adjacent robots have +1 health."
* **Triggered ability**: "Whenever this robot attacks, your adjacent robots get +1 health."
* **Activated ability**: "Activate: Give a robot +1 health."

There are two types of sentences: _actions_ and _abilities_. Action cards have actions; robot and structure cards have abilities.

There are three types of abilities: _passive_, _triggered_, and _activated_.

An **action** is an effect that happens immediately (for example, "Give a robot +1 health" or “Draw a card”).

A **passive ability** is performed continuously. For example, if a robot has the passive ability "Your adjacent robots have +1 health", the robots adjacent to it *at any given point in time* will have +1 health. This means that when that robot moves, the effect will move with it. If that robot is destroyed, the effect will go away.

A **triggered ability** is something that happens each time a certain *trigger* occurs. For example, let’s say a robot has the triggered ability "Whenever this robot attacks, your adjacent robots get +1 health." The associated action (“your adjacent robots get +1 health”) will happen *each time* that robot attacks. This means that, for example, if the robot attacks three times from the same position, its adjacent robots will get +3 health.

An **activated ability** can be performed once per turn at the player’s discretion. For example, a robot with the activated ability "Activate: Give a robot +1 health." can be *activated* once per turn to perform the associated action . Robots can’t activate and attack in the same turn, and they can’t activate the turn they’re played.

## Troubleshooting

If your card text is not parsing successfully, here are some things to consider:

**1. Are you using a word or phrase that is not recognized?**

If any words are underlined in red in the card preview, that means that the parser can’t recognize them. If you’re getting stuck, try checking the [dictionary](${location.pathname}//dictionary) to see what words/phrases the parser understands.

**2. Are you writing the right kind of sentence for the card type?**

Remember that action cards must perform one-time actions, while robots/structures must have recurring abilities. For example, if you’re making an action, you can’t say "All robots have +1 attack" – because “have” indicates a passive ability, not an action. (You’d need to say “Give all robots +1 attack” instead.)

**3. Is your phrasing incorrect?**

If you keep getting syntax errors, you might be phrasing what you’re trying to express in a way that the parser doesn’t understand. Check the [dictionary](${location.pathname}//dictionary) for similar sentences (sentences that use the same phrases that you’re using) and see how they’re worded.

**4. Are you trying to do something that the game doesn’t support?**

You might be trying to implement a feature that’s not supported by the game. Check the [thesaurus](${location.pathname}//dictionary#t) to see all of the actions, abilities, conditions, and targets that are currently supported.

**5. Still no luck?**

If you’re still having trouble designing your card, reach out to us on [our Discord channel](http://discord.wordbots.io), and we’ll do our best to help!
`;
