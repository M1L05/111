/* global DEFAULT_TOKEN, ActorSheet, ChatMessage, Dialog, Roll, duplicate, game, mergeObject */

/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {ActorSheet}
 */
 export class MageActorSheet extends ActorSheet {
    /** @override */
    static get defaultOptions () {
      return mergeObject(super.defaultOptions, {
        classes: ['ma20th', 'sheet', 'actor'],
        template: 'systems/ma20th/templates/actor/mage20th-sheet.html',
        width: 1000,
        height: 900,
        tabs: [{ navSelector: '.sheet-tabs', contentSelector: '.sheet-body', initial: 'stats' }]
      })
    }
  
    /* -------------------------------------------- */
  
    /** @override */
    getData () {
      const data = super.getData()
      // TODO: confirm that I can finish and use this list
      const BLOOD_POTENCY = [
        {
          surge: game.i18n.localize('MA20th.Add1Dice'),
          mend: game.i18n.localize('MA20th.1SuperficialDamage'),
          power: game.i18n.localize('MA20th.None'),
          rouse: game.i18n.localize('MA20th.None'),
          bane: '0',
          feeding: game.i18n.localize('MA20th.NoEffect')
        },
        {
          surge: game.i18n.localize('MA20th.Add2Dice'),
          mend: game.i18n.localize('MA20th.1SuperficialDamage'),
          power: game.i18n.localize('MA20th.None'),
          rouse: game.i18n.localize('MA20th.Level1'),
          bane: '2',
          feeding: game.i18n.localize('MA20th.NoEffect')
        },
        {
          surge: game.i18n.localize('MA20th.Add2Dice'),
          mend: game.i18n.localize('MA20th.2SuperficialDamage'),
          power: game.i18n.localize('MA20th.Add1Dice'),
          rouse: game.i18n.localize('MA20th.Level1'),
          bane: '2',
          feeding: game.i18n.localize('MA20th.FeedingPenalty1')
        },
        {
          surge: game.i18n.localize('MA20th.Add3Dice'),
          mend: game.i18n.localize('MA20th.2SuperficialDamage'),
          power: game.i18n.localize('MA20th.Add1Dice'),
          rouse: game.i18n.localize('MA20th.Level2'),
          bane: '3',
          feeding: game.i18n.localize('MA20th.FeedingPenalty2')
        },
        {
          surge: game.i18n.localize('MA20th.Add3Dice'),
          mend: game.i18n.localize('MA20th.3SuperficialDamage'),
          power: game.i18n.localize('MA20th.Add2Dice'),
          rouse: game.i18n.localize('MA20th.Level2'),
          bane: '3',
          feeding: game.i18n.localize('MA20th.FeedingPenalty3')
        },
        {
          surge: game.i18n.localize('MA20th.Add4Dice'),
          mend: game.i18n.localize('MA20th.3SuperficialDamage'),
          power: game.i18n.localize('MA20th.Add2Dice'),
          rouse: game.i18n.localize('MA20th.Level3'),
          bane: '4',
          feeding: game.i18n.localize('MA20th.FeedingPenalty4')
        },
        {
          surge: game.i18n.localize('MA20th.Add4Dice'),
          mend: game.i18n.localize('MA20th.3SuperficialDamage'),
          power: game.i18n.localize('MA20th.Add3Dice'),
          rouse: game.i18n.localize('MA20th.Level3'),
          bane: '4',
          feeding: game.i18n.localize('MA20th.FeedingPenalty5')
        },
        {
          surge: game.i18n.localize('MA20th.Add5Dice'),
          mend: game.i18n.localize('MA20th.3SuperficialDamage'),
          power: game.i18n.localize('MA20th.Add3Dice'),
          rouse: game.i18n.localize('MA20th.Level4'),
          bane: '5',
          feeding: game.i18n.localize('MA20th.FeedingPenalty5')
        },
        {
          surge: game.i18n.localize('MA20th.Add5Dice'),
          mend: game.i18n.localize('MA20th.4SuperficialDamage'),
          power: game.i18n.localize('MA20th.Add4Dice'),
          rouse: game.i18n.localize('MA20th.Level4'),
          bane: '5',
          feeding: game.i18n.localize('MA20th.FeedingPenalty6')
        },
        {
          surge: game.i18n.localize('MA20th.Add6Dice'),
          mend: game.i18n.localize('MA20th.4SuperficialDamage'),
          power: game.i18n.localize('MA20th.Add4Dice'),
          rouse: game.i18n.localize('MA20th.Level5'),
          bane: '6',
          feeding: game.i18n.localize('MA20th.FeedingPenalty6')
        },
        {
          surge: game.i18n.localize('MA20th.Add6Dice'),
          mend: game.i18n.localize('MA20th.5SuperficialDamage'),
          power: game.i18n.localize('MA20th.Add5Dice'),
          rouse: game.i18n.localize('MA20th.Level5'),
          bane: '6',
          feeding: game.i18n.localize('MA20th.FeedingPenalty7')
        }
      ]
      data.dtypes = ['String', 'Number', 'Boolean']
  
      // Prepare items.
      if (this.actor.data.type === 'character') {
        this._prepareCharacterItems(data)
        this._prepareCharacterAbilities(data)
      }
  
      data.blood_potency = BLOOD_POTENCY
  
      return data
    }

    /**
       * Default value 1 to all Abilities.
       *
       * @param {Object} actorData The actor to prepare.
       *
       * @return {undefined}
       */
     _prepareCharacterAbilities (sheetData) {
        const actorData = sheetData.data.data.abilities

        if (actorData.strength.value === 0) {
          actorData.strength.value = 1
        }
        if (actorData.charisma.value === 0) {
          actorData.charisma.value = 1
        }
        if (actorData.intelligence.value === 0) {
          actorData.intelligence.value = 1
        }
        if (actorData.dexterity.value === 0) {
          actorData.dexterity.value = 1
        }
        if (actorData.manipulation.value === 0) {
          actorData.manipulation.value = 1
        }
        if (actorData.wits.value === 0) {
          actorData.wits.value = 1
        }
        if (actorData.stamina.value === 0) {
          actorData.stamina.value = 1
        }
        if (actorData.appearance.value === 0) {
          actorData.appearance.value = 1
        }
        if (actorData.perception.value === 0) {
          actorData.perception.value = 1
        }
     }


  
    /**
       * Organize and classify Items for Character sheets.
       *
       * @param {Object} actorData The actor to prepare.
       *
       * @return {undefined}
       */
    _prepareCharacterItems (sheetData) {
      const actorData = sheetData.actor
  
      // Initialize containers.
      const backgrounds = []
      const specialties = []
      const gear = []
      const features = {
        merit: [],
        flaw: []
      }
      const disciplines = {
        animalism: [],
        auspex: [],
        celerity: [],
        dominate: [],
        fortitude: [],
        obfuscate: [],
        potence: [],
        presence: [],
        protean: [],
        sorcery: [],
        oblivion: [],
        rituals: [],
        ceremonies: [],
        alchemy: []
      }
  
      // Iterate through items, allocating to containers
      for (const i of sheetData.items) {
        i.img = i.img || DEFAULT_TOKEN
        if (i.type === 'specialty') {
          // Append to specialties.
          specialties.push(i)
        } else if (i.type === 'item') {
          // Append to gear.
          gear.push(i)
        } else if (i.type === 'background') {
          // Append to background.
          backgrounds.push(i)
        } else if (i.type === 'feature') {
          // Append to features.
          features[i.data.featuretype].push(i)
        } else if (i.type === 'power') {
          // Append to disciplines.
          if (i.data.discipline !== undefined) {
            disciplines[i.data.discipline].push(i)
            if (!this.actor.data.data.disciplines[i.data.discipline].visible) {
              this.actor.update({ [`data.disciplines.${i.data.discipline}.visible`]: true })
            }
          }
        }
      }
  
      // Assign and return
      actorData.specialties = specialties
      actorData.gear = gear
      actorData.features = features
      actorData.disciplines_list = disciplines
      actorData.backgrounds = backgrounds;
    }
  
    /* -------------------------------------------- */
  
    /** @override */
    activateListeners (html) {
      super.activateListeners(html)
  
      this._setupDotCounters(html)
      this._setupSquareCounters(html)
      this._setupSquareCountersSyb(html)
      this._setupSquareCounters2cf(html)
  
      // Everything below here is only needed if the sheet is editable
      if (!this.options.editable) return
  
      // Make Discipline visible
      html.find('.discipline-create').click(this._onShowDiscipline.bind(this))
  
      // Make Discipline hidden
      html.find('.discipline-delete').click(ev => {
        const data = $(ev.currentTarget)[0].dataset
        this.actor.update({ [`data.disciplines.${data.discipline}.visible`]: false })
      })
  
      // Add Inventory Item
      html.find('.item-create').click(this._onItemCreate.bind(this))
  
      // Update Inventory Item
      html.find('.item-edit').click(ev => {
        const li = $(ev.currentTarget).parents('.item')
        
        const item = this.actor.items.get(li.data('itemId'))
        item.sheet.render(true)
      })
  
      // Delete Inventory Item
      html.find('.item-delete').click(ev => {
        const li = $(ev.currentTarget).parents('.item')

        this.actor.deleteEmbeddedDocuments("Item", [li.data('itemId')], {})
        li.slideUp(200, () => this.render(false))
      })
  
      // Rollable abilities.
      html.find('.rollable').click(this._onRoll.bind(this))
  
      // Rollable Vampire abilities.
      html.find('.vrollable').click(this._onVampireRollDialog.bind(this))

      // Rollable Skills.
      html.find('.skillrollable').click(this._onSkillRollDialog.bind(this))

      // Rollable Abilities
      html.find('.abilityrollable').click(this._onAbilityRollDialog.bind(this))
  
      html.find('.resource-value > .resource-value-step').click(this._onDotCounterChange.bind(this))
      html.find('.resource-value > .resource-value-empty').click(this._onDotCounterEmpty.bind(this))
      html.find('.resource-counter > .resource-counter-step').click(this._onSquareCounterChange.bind(this))
      html.find('.resource-counter > .resource-counter2-step').click(this._onSquareCounterChange.bind(this))
      html.find('.resource-counter > .resource-counter3-step').click(this._onSquareCounterChange.bind(this))
      html.find('.resource-counter > .resource-vitality-step').click(this._onSquareCounterChange.bind(this))

      html.find('.resource-counter-syb > .resource-counter-syb-step').click(this._onSquareSybCounterChange.bind(this))
      html.find('.resource-button').click(this._onSquare2cfCounterChange.bind(this))
      
  
      // Drag events for macros.
      // if (this.actor.owner) {
      //   let handler = ev => this._onDragItemStart(ev);
      //   html.find('li.item').each((i, li) => {
      //     if (li.classList.contains("inventory-header")) return;
      //     li.setAttribute("draggable", true);
      //     li.addEventListener("dragstart", handler, false);
      //   });
      // }
  
      // Collapsible Vampire powers
      const coll = document.getElementsByClassName('collapsible')
      let i
  
      for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener('click', function () {
          this.classList.toggle('active')
          const content = this.parentElement.nextElementSibling
          if (content.style.maxHeight) {
            content.style.maxHeight = null
          } else {
            content.style.maxHeight = content.scrollHeight + 'px'
          }
        })
      }
    }
  
    /**
       * Handle making a discipline visible
       * @param {Event} event   The originating click event
       * @private
       */
    _onShowDiscipline (event) {
      event.preventDefault()
      let options = ''
      for (const [key, value] of Object.entries(this.actor.data.data.disciplines)) {
        options = options.concat(`<option value="${key}">${game.i18n.localize(value.name)}</option>`)
      }
  
      const template = `
        <form>
            <div class="form-group">
                <label>${game.i18n.localize('MA20th.SelectDiscipline')}</label>
                <select id="disciplineSelect">${options}</select>
            </div>
        </form>`
  
      let buttons = {}
      buttons = {
        draw: {
          icon: '<i class="fas fa-check"></i>',
          label: game.i18n.localize('MA20th.Add'),
          callback: async (html) => {
            const discipline = html.find('#disciplineSelect')[0].value
            this.actor.update({ [`data.disciplines.${discipline}.visible`]: true })
          }
        },
        cancel: {
          icon: '<i class="fas fa-times"></i>',
          label: game.i18n.localize('MA20th.Cancel')
        }
      }
  
      new Dialog({
        title: game.i18n.localize('MA20th.AddDiscipline'),
        content: template,
        buttons: buttons,
        default: 'draw'
      }).render(true)
    }
  
    /**
       * Handle creating a new Owned Item for the actor using initial data defined in the HTML dataset
       * @param {Event} event   The originating click event
       * @private
       */
    _onItemCreate (event) {
      event.preventDefault()
      const header = event.currentTarget
      // Get the type of item to create.
      const type = header.dataset.type
      // Grab any data associated with this control.
      const data = duplicate(header.dataset)
      if (type === 'specialty') {
        data.skill = ''
      }
      // Initialize a default name.
      const name = `New ${type.capitalize()}`
      // Prepare the item object.
      const itemData = {
        name: name,
        type: type,
        data: data
      }
      // Remove the type from the dataset since it's in the itemData.type prop.
      delete itemData.data.type
  
      // Finally, create the item!
      return this.actor.createEmbeddedDocuments("Item", [itemData], {})
    }
  
    /**
       * Handle clickable rolls.
       * @param {Event} event   The originating click event
       * @private
       */
    _onRoll (event) {
      event.preventDefault()
      const element = event.currentTarget
      const dataset = element.dataset
  
      if (dataset.roll) {
        const roll = new Roll(dataset.roll + 'dvcs>5', this.actor.data.data)
        const rollResult = roll.evaluate()
  
        let success = 0
        let critSuccess = 0
        let fail = 0
  
        rollResult.terms[0].results.forEach((dice) => {
          if (dice.success) {
            if (dice.result === 10) {
              critSuccess++
            } else {
              success++
            }
          } else {
            fail++
          }
        })
  
        let totalCritSuccess = 0
        totalCritSuccess = Math.floor(critSuccess / 2)
        const totalSuccess = (totalCritSuccess * 2) + success + critSuccess
  
        let label = dataset.label ? `<p class="roll-label uppercase">${dataset.label}</p>` : ''
  
        if (totalCritSuccess) {
          label = label + `<p class="roll-content">${game.i18n.localize('MA20th.CriticalSuccess')}</p>`
        }
  
        label = label + `<p class="roll-label">${game.i18n.localize('MA20th.Successes')}: ${totalSuccess}</p>`
  
        for (let i = 0, j = critSuccess; i < j; i++) {
          label = label + '<img src="systems/ma20th/assets/images/normal-crit.png" alt="Normal Crit" class="roll-img">'
        }
        for (let i = 0, j = success; i < j; i++) {
          label = label + '<img src="systems/ma20th/assets/images/normal-success.png" alt="Normal Success" class="roll-img">'
        }
        for (let i = 0, j = fail; i < j; i++) {
          label = label + '<img src="systems/ma20th/assets/images/normal-fail.png" alt="Normal Fail" class="roll-img">'
        }
  
        rollResult.toMessage({
          speaker: ChatMessage.getSpeaker({ actor: this.actor }),
          flavor: label
        })
      }
    }

    _lifeModifier () {
      var modifier = 0;
      let currentLife = this.actor.data.data.health.total
     
      if ((currentLife > 1) && (currentLife <= 3)) {
        modifier = -1;
      } else if ((currentLife > 3) && (currentLife <= 5)){
        modifier = -2;
      } else if (currentLife > 5) {
        modifier = -5;
      }

      return modifier;
    }
    
    _defaultRoll (numDices, dificulty, modifier, rollTitle = '' ,isProf = false) {
      // Default Roll
      let roll = new Roll(`${numDices + modifier}d10cs>=${dificulty}df=1`);
      let title = game.i18n.localize(rollTitle);
	
      roll.toMessage({
        user: game.user._id,
        flavor: `${game.i18n.localize('MA20th.Roll')}: ${title}.`,
        speaker: ChatMessage.getSpeaker({token: this.token}),
      });
      
      // Proficient Roll
      const profRoll = roll.terms[0].results.filter(e => e.result === 10);
      if (isProf && (profRoll.length > 0)){
        let rollProf = new Roll(`${profRoll.length}d10cs>=${dificulty}df=1`);
      
        rollProf.toMessage({
          user: game.user._id,
          flavor: `${game.i18n.localize('MA20th.Proficient')}: ${title}.`,
          speaker: ChatMessage.getSpeaker({token: this.token}),
        });
      }
    }
  
    // roll helper
    _vampireRoll (numDice, actor, label = '', difficulty = 0) {
      const hungerDice = Math.min(actor.data.data.hunger.value, numDice)
      const dice = numDice - hungerDice
      const roll = new Roll(dice + 'dvcs>5 + ' + hungerDice + 'dhcs>5', actor.data.data)
      const rollResult = roll.evaluate()
  
      let difficultyResult = '<span></span>'
      let success = 0
      let hungerSuccess = 0
      let critSuccess = 0
      let hungerCritSuccess = 0
      let fail = 0
      let hungerFail = 0
      let hungerCritFail = 0
  
      rollResult.terms[0].results.forEach((dice) => {
        if (dice.success) {
          if (dice.result === 10) {
            critSuccess++
          } else {
            success++
          }
        } else {
          fail++
        }
      })
  
      rollResult.terms[2].results.forEach((dice) => {
        if (dice.success) {
          if (dice.result === 10) {
            hungerCritSuccess++
          } else {
            hungerSuccess++
          }
        } else {
          if (dice.result === 1) {
            hungerCritFail++
          } else {
            hungerFail++
          }
        }
      })
  
      let totalCritSuccess = 0
      totalCritSuccess = Math.floor((critSuccess + hungerCritSuccess) / 2)
      const totalSuccess = (totalCritSuccess * 2) + success + hungerSuccess + critSuccess + hungerCritSuccess
      let successRoll = false
      if (difficulty !== 0) {
        successRoll = totalSuccess >= difficulty
        difficultyResult = `( <span class="danger">${game.i18n.localize('MA20th.Fail')}</span> )`
        if (successRoll) {
          difficultyResult = `( <span class="success">${game.i18n.localize('MA20th.Success')}</span> )`
        }
      }
  
      label = `<p class="roll-label uppercase">${label}</p>`
  
      if (hungerCritSuccess && totalCritSuccess) {
        label = label + `<p class="roll-content">${game.i18n.localize('MA20th.MessyCritical')}</p>`
      } else if (totalCritSuccess) {
        label = label + `<p class="roll-content">${game.i18n.localize('MA20th.CriticalSuccess')}</p>`
      }
      if (hungerCritFail && !successRoll && difficulty > 0) {
        label = label + `<p class="roll-content">${game.i18n.localize('MA20th.BestialFailure')}</p>`
      }
      if (hungerCritFail && !successRoll && difficulty === 0) {
        label = label + `<p class="roll-content">${game.i18n.localize('MA20th.PossibleBestialFailure')}</p>`
      }
  
      label = label + `<p class="roll-label">${game.i18n.localize('MA20th.Successes')}: ${totalSuccess} ${difficultyResult}</p>`
  
      for (let i = 0, j = critSuccess; i < j; i++) {
        label = label + '<img src="systems/ma20th/assets/images/normal-crit.png" alt="Normal Crit" class="roll-img">'
      }
      for (let i = 0, j = success; i < j; i++) {
        label = label + '<img src="systems/ma20th/assets/images/normal-success.png" alt="Normal Success" class="roll-img">'
      }
      for (let i = 0, j = fail; i < j; i++) {
        label = label + '<img src="systems/ma20th/assets/images/normal-fail.png" alt="Normal Fail" class="roll-img">'
      }
  
      label = label + '<br>'
  
      for (let i = 0, j = hungerCritSuccess; i < j; i++) {
        label = label + '<img src="systems/ma20th/assets/images/red-crit.png" alt="Hunger Crit" class="roll-img">'
      }
      for (let i = 0, j = hungerSuccess; i < j; i++) {
        label = label + '<img src="systems/ma20th/assets/images/red-success.png" alt="Hunger Success" class="roll-img">'
      }
      for (let i = 0, j = hungerCritFail; i < j; i++) {
        label = label + '<img src="systems/ma20th/assets/images/bestial-fail.png" alt="Bestial Fail" class="roll-img">'
      }
      for (let i = 0, j = hungerFail; i < j; i++) {
        label = label + '<img src="systems/ma20th/assets/images/red-fail.png" alt="Hunger Fail" class="roll-img">'
      }
  
      rollResult.toMessage({
        speaker: ChatMessage.getSpeaker({ actor: actor }),
        flavor: label
      })
    }

    /**
       * Handle clickable Vampire rolls.
       * @param {Event} event   The originating click event
       * @private
       */
     _onSkillRollDialog (event) {
      event.preventDefault();
      // Get HTML Label fo Target
      const element = event.currentTarget
      // Get Skills properties: { label: name, roll: values }
      const skillProperties = element.dataset
      
      let options = '';
      for (const [key, value] of Object.entries(this.actor.data.data.abilities)) {
        options = options.concat(`<option value="${key}">${game.i18n.localize(value.name)}</option>`)
      }

      let lifeModifier = this._lifeModifier();
  
      const template = `
        <form>
            <div class="form-group">
                <label>${game.i18n.localize('MA20th.SelectAbility')}</label>
                <select id="abilitySelect">${options}</select>
            </div>
            <div class="form-group">
                <label>${game.i18n.localize('MA20th.Difficulty')}</label>
                <input type="text" min="0" id="inputDif" value="6">
            </div>  
            <div class="form-group">
                <label>${game.i18n.localize('MA20th.Modifier')}</label>
                <input type="text" id="inputMod" value="${lifeModifier}">
            </div>  
            <div>
              <label>${game.i18n.localize('MA20th.Proficient')}</label>
              <input type="checkbox" id="inputProf">
            </div>
        </form>`
  
      let buttons = {}
      buttons = {
        draw: {
          icon: '<i class="fas fa-check"></i>',
          label: game.i18n.localize('MA20th.Roll'),
          callback: async (html) => {
            const ability = html.find('#abilitySelect')[0].value
            const modifier = parseInt(html.find('#inputMod')[0].value || 0)
            const difficulty = parseInt(html.find('#inputDif')[0].value || 6)
            const prof = html.find('#inputProf')[0].checked || false
            const abilityVal = this.actor.data.data.abilities[ability].value
            const skillName = skillProperties.label
            const numDice = abilityVal + parseInt(skillProperties.roll)
            this._defaultRoll(numDice, difficulty, modifier, skillName, prof);
          }
        },
        cancel: {
          icon: '<i class="fas fa-times"></i>',
          label: game.i18n.localize('MA20th.Cancel')
        }
      }
  
      new Dialog({
        title: `${game.i18n.localize('MA20th.Rolling')}   ${game.i18n.localize(skillProperties.label)}...`,
        content: template,
        buttons: buttons,
        default: 'draw'
      }).render(true)
    }

    /**
       * Handle clickable Vampire rolls.
       * @param {Event} event   The originating click event
       * @private
       */
    _onAbilityRollDialog (event) {
      event.preventDefault();
      // Get HTML Label fo Target
      const element = event.currentTarget
      // Get Ability properties: { label: name, roll: values }
      const abilityProperties = element.dataset

      let lifeModifier = this._lifeModifier();
  
      const template = `
        <form>
            <div class="form-group">
                <label>${game.i18n.localize('MA20th.Difficulty')}</label>
                <input type="text" min="0" id="inputDif" value="6">
            </div>
            <div class="form-group">
                <label>${game.i18n.localize('MA20th.Modifier')}</label>
                <input type="text" id="inputMod" value="${lifeModifier}">
            </div>   
        </form>`
  
      let buttons = {}
      buttons = {
        draw: {
          icon: '<i class="fas fa-check"></i>',
          label: game.i18n.localize('MA20th.Roll'),
          callback: async (html) => {
            const abilityName = abilityProperties.label
            const difficulty = parseInt(html.find('#inputDif')[0].value || 6)
            const modifier = parseInt(html.find('#inputMod')[0].value || 0)
            const abilityVal = parseInt(abilityProperties.roll)
            const numDice = abilityVal
            this._defaultRoll(numDice, difficulty, modifier, abilityName, false);
          }
        },
        cancel: {
          icon: '<i class="fas fa-times"></i>',
          label: game.i18n.localize('MA20th.Cancel')
        }
      }
  
      new Dialog({
        title: `${game.i18n.localize('MA20th.Rolling')}   ${game.i18n.localize(abilityProperties.label)}...`,
        content: template,
        buttons: buttons,
        default: 'draw'
      }).render(true)
    }
  
    /**
       * Handle clickable Vampire rolls.
       * @param {Event} event   The originating click event
       * @private
       */
    _onVampireRollDialog (event) {
      event.preventDefault()
      const element = event.currentTarget
      const dataset = element.dataset
      let options = ''

      for (const [key, value] of Object.entries(this.actor.data.data.abilities)) {
        options = options.concat(`<option value="${key}">${game.i18n.localize(value.name)}</option>`)
      }
  
      const template = `
        <form>
            <div class="form-group">
                <label>${game.i18n.localize('MA20th.SelectAbility')}</label>
                <select id="abilitySelect">${options}</select>
            </div>  
            <div class="form-group">
                <label>${game.i18n.localize('MA20th.Modifier')}</label>
                <input type="text" id="inputMod" value="0">
            </div>  
            <div class="form-group">
                <label>${game.i18n.localize('MA20th.Difficulty')}</label>
                <input type="text" min="0" id="inputDif" value="0">
            </div>
        </form>`
  
      let buttons = {}
      buttons = {
        draw: {
          icon: '<i class="fas fa-check"></i>',
          label: game.i18n.localize('MA20th.Roll'),
          callback: async (html) => {
            const ability = html.find('#abilitySelect')[0].value
            const modifier = parseInt(html.find('#inputMod')[0].value || 0)
            const difficulty = parseInt(html.find('#inputDif')[0].value || 0)
            const abilityVal = this.actor.data.data.abilities[ability].value
            const abilityName = game.i18n.localize(this.actor.data.data.abilities[ability].name)
            const numDice = abilityVal + parseInt(dataset.roll) + modifier
            this._vampireRoll(numDice, this.actor, `${dataset.label} + ${abilityName}`, difficulty)
          }
        },
        cancel: {
          icon: '<i class="fas fa-times"></i>',
          label: game.i18n.localize('MA20th.Cancel')
        }
      }
  
      new Dialog({
        title: game.i18n.localize('MA20th.Rolling') + ` ${dataset.label}...`,
        content: template,
        buttons: buttons,
        default: 'draw'
      }).render(true)
    }
  
    _onVampireRoll (event) {
      event.preventDefault()
      const element = event.currentTarget
      const dataset = element.dataset
      const item = this.actor.items.get(dataset.id)
      let disciplineValue = 0
      if (item.data.data.discipline === 'rituals') {
        disciplineValue = this.actor.data.data.disciplines.sorcery.value
      } else if (item.data.data.discipline === 'ceremonies') {
        disciplineValue = this.actor.data.data.disciplines.oblivion.value
      } else {
        disciplineValue = this.actor.data.data.disciplines[item.data.data.discipline].value
      }
      const dice1 = item.data.data.dice1 === 'discipline' ? disciplineValue : this.actor.data.data.abilities[item.data.data.dice1].value
      const dice2 = item.data.data.dice2 === 'discipline' ? disciplineValue : this.actor.data.data.abilities[item.data.data.dice2].value
      const dicePool = dice1 + dice2
      this._vampireRoll(dicePool, this.actor, `${item.data.name}`)
    }
  
    // There's gotta be a better way to do this but for the life of me I can't figure it out
    _assignToActorField (fields, value) {
      const actorData = duplicate(this.actor)
      const lastField = fields.pop()
      
      // console.log(actorData);
      // console.log(value);
      // console.log(fields);
      // console.log(lastField)

      if (fields[0] === 'item') {
        var itemIndex = -1;
        
        actorData.items.find(function(item, i){
          if (item._id === fields[1]) {
            itemIndex = i
          }
        })

        actorData.items[itemIndex].data.value = value 
      } else {
        fields.reduce((data, field) => data[field], actorData)[lastField] = value
      }
      
      // actorData.data[lastField] = value
      this.actor.update(actorData)
    }
  
    _onDotCounterEmpty (event) {
      event.preventDefault()
      const element = event.currentTarget
      const parent = $(element.parentNode)
      const fieldStrings = parent[0].dataset.name
      const fields = fieldStrings.split('.')
      const steps = parent.find('.resource-value-empty')
  
      steps.removeClass('active')
      this._assignToActorField(fields, 0)
    }
  
    _onSquareCounterChange (event) {
      event.preventDefault()
      const element = event.currentTarget
      const index = Number(element.dataset.index)
      const oldState = element.dataset.state || ''
      const parent = $(element.parentNode)
      const data = parent[0].dataset
      const states = parseCounterStates(data.states)
      const fields = data.name.split('.')
      var steps = parent.find('.resource-counter-step')
      const humanity = data.name === 'data.humanity'
      const fulls = Number(data[states['-']]) || 0
      const halfs = Number(data[states['/']]) || 0
      const crossed = Number(data[states.x]) || 0

      if (steps.length === 0) {
        steps = parent.find('.resource-counter2-step')
      }

      if (steps.length === 0) {
        steps = parent.find('.resource-counter3-step')
      }

      if (steps.length === 0) {
        steps = parent.find('.resource-vitality-step')
      }
  
      if (index < 0 || index > steps.length) {
        return
      }
  
      const allStates = ['', ...Object.keys(states)]
      const currentState = allStates.indexOf(oldState)
      if (currentState < 0) {
        return
      }
  
      const newState = allStates[(currentState + 1) % allStates.length]
      steps[index].dataset.state = newState
  
      if ((oldState !== '' && oldState !== '-') || (oldState !== '' && humanity)) {
        data[states[oldState]] = Number(data[states[oldState]]) - 1
      }
  
      // If the step was removed we also need to subtract from the maximum.
      if (oldState !== '' && newState === '' && !humanity) {
        data[states['-']] = Number(data[states['-']]) - 1
      }
  
      if (newState !== '') {
        data[states[newState]] = Number(data[states[newState]]) + Math.max(index + 1 - fulls - halfs - crossed, 1)
      }
  
      const newValue = Object.values(states).reduce(function (obj, k) {
        obj[k] = Number(data[k]) || 0

        return obj
      }, {})
  
      this._assignToActorField(fields, newValue)
    }

    _onSquareSybCounterChange (event) {
      event.preventDefault()
      const element = event.currentTarget
      const index = Number(element.dataset.index)
      const oldState = element.dataset.state || ''
      const parent = $(element.parentNode)
      const data = parent[0].dataset
      const states = parseCounterStates(data.states)
      const fields = data.name.split('.')
      var steps = parent.find('.resource-counter-syb-step')
      const halfs = Number(data[states['/']]) || 0
      const crossed = Number(data[states.x]) || 0
  
      if (index < 0 || index > steps.length) {
        return
      }
  
      const allStates = ['', ...Object.keys(states)]
      const currentState = allStates.indexOf(oldState)
      if (currentState < 0) {
        return
      }
  
      const newState = allStates[(currentState + 1) % allStates.length]
      steps[index].dataset.state = newState
  
      if ((oldState !== '' && oldState !== '-') || (oldState !== '')) {
        data[states[oldState]] = Number(data[states[oldState]]) - 1
      }
  
      // If the step was removed we also need to subtract from the maximum.
      if (oldState !== '' && newState === '') {
        data[states['-']] = Number(data[states['-']]) - 1
      }
  
      if (newState !== '') {
        data[states[newState]] = Number(data[states[newState]]) + Math.max(index + 1 - halfs - crossed, 1)
      }
  
      const newValue = Object.values(states).reduce(function (obj, k) {
        obj[k] = Number(data[k]) || 0
        return obj
      }, {})
  
      this._assignToActorField(fields, newValue)
    }

    _onSquare2cfCounterChange (event) {
      event.preventDefault()
      const element = event.currentTarget
      const index = element.dataset.index
      const state = element.dataset.state

      const totalQ = this.actor.data.data.magika.quintessence
      const totalP = this.actor.data.data.magika.paradox
      var stapOver = false

      if ((totalQ + totalP) === 20) {
        stapOver = true
      }

      if (index === 'q') {
        if (state === '+') {
          // Add if quintessence < 20
          (totalQ < 20) && this._assignToActorField(['data', 'magika'], {quintessence: totalQ + 1})
          // Stap Over Paradox if necessary
          stapOver && this._assignToActorField(['data', 'magika'], {paradox: totalP - 1})
        }else{
          // Remove if quintessence > 0
          (totalQ > 0) && this._assignToActorField(['data', 'magika'], {quintessence: totalQ - 1})
        }
      }else{
        if (state === '+') {
          (totalP < 20) && this._assignToActorField(['data', 'magika'], {paradox: totalP + 1})
          stapOver && this._assignToActorField(['data', 'magika'], {quintessence: totalQ - 1})
        }else{
          (totalP > 0) && this._assignToActorField(['data', 'magika'], {paradox: totalP - 1})
        }
      }
    }
  
    _onDotCounterChange (event) {
      event.preventDefault()
      const element = event.currentTarget
      const dataset = element.dataset
      const index = Number(dataset.index)
      const parent = $(element.parentNode)
      const fieldStrings = parent[0].dataset.name
      const fields = fieldStrings.split('.')
      const steps = parent.find('.resource-value-step')
      if (index < 0 || index > steps.length) {
        return
      }
  
      steps.removeClass('active')
      steps.each(function (i) {
        if (i <= index) {
          $(this).addClass('active')
        }
      })
      this._assignToActorField(fields, index + 1)
    }
  
    _setupDotCounters (html) {
      html.find('.resource-value').each(function () {
        const value = Number(this.dataset.value)
        $(this).find('.resource-value-step').each(function (i) {
          if (i + 1 <= value) {
            $(this).addClass('active')
          }
        })
      })
    }
  
    _setupSquareCounters (html) {
      html.find('.resource-counter').each(function () {
        const data = this.dataset
        const states = parseCounterStates(data.states)
        const humanity = data.name === 'data.humanity'
  
        const fulls = Number(data[states['-']]) || 0
        const halfs = Number(data[states['/']]) || 0
        const crossed = Number(data[states.x]) || 0
  
        const values = humanity ? new Array(fulls + halfs) : new Array(fulls)
        values.fill('-', 0, fulls)
        if (humanity) {
          values.fill('/', fulls, fulls + halfs)
        } else {
          values.fill('/', fulls - halfs - crossed, fulls - crossed)
          values.fill('x', fulls - crossed, fulls)
        }
  
        $(this).find('.resource-counter-step').each(function () {
          this.dataset.state = ''
          if (this.dataset.index < values.length) {
            this.dataset.state = values[this.dataset.index]
          }
        })

        $(this).find('.resource-counter2-step').each(function () {
          this.dataset.state = ''
          if (this.dataset.index < values.length) {
            this.dataset.state = values[this.dataset.index]
          }
        })

        $(this).find('.resource-counter3-step').each(function () {
          this.dataset.state = ''
          if (this.dataset.index < values.length) {
            this.dataset.state = values[this.dataset.index]
          }
        })

        $(this).find('.resource-vitality-step').each(function () {
          this.dataset.state = ''
          if (this.dataset.index < values.length) {
            this.dataset.state = values[this.dataset.index]
          }
        })
      })
    }

    _setupSquareCountersSyb (html) {
      html.find('.resource-counter-syb').each(function () {
        const data = this.dataset
        const states = parseCounterStates(data.states)
  
        const halfs = Number(data[states['/']]) || 0
        const crossed = Number(data[states.x]) || 0
  
        const values = new Array(halfs)
        values.fill('/', 0, halfs)
        values.fill('x', halfs - crossed, halfs)

        $(this).find('.resource-counter-syb-step').each(function () {
          this.dataset.state = ''
          if (this.dataset.index < values.length) {
            this.dataset.state = values[this.dataset.index]
          }
        })
      })
    }

    _setupSquareCounters2cf (html) {
      html.find('.resource-counter-2cf').each(function () {
        const data = this.dataset
        const states = parseCounterStates(data.states)
  
        const fulls = Number(data[states['-']]) || 0
        const halfs = Number(data[states['/']]) || 0
  
        const values = new Array(20)

        values.fill('-', 0, fulls)
        values.fill('/', 20 - halfs, 20)

        $(this).find('.resource-counter-2cf-step').each(function () {
          this.dataset.state = ''
          if (this.dataset.index < values.length) {
            this.dataset.state = values[this.dataset.index]
          }
        })
      })
    }
  }
  
  function parseCounterStates (states) {
    return states.split(',').reduce((obj, state) => {
      const [k, v] = state.split(':')
      obj[k] = v
      return obj
    }, {})
  }
  