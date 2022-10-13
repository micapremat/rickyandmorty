import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import HeaderCharacters from '@/components/HeaderCharacters.vue'

const localVue = createLocalVue()
localVue.use(Vuex)
const recipeMock = jest.fn()
recipeMock.mockReturnValue('allCharacters')
const store = new Vuex.Store({
  getters: {
    allCharacters: recipeMock
  }
})

describe('HeaderCharacters.vue', () => {
  let wraper
  beforeEach(() => {
    wraper = shallowMount(HeaderCharacters, {
      localVue,
      store
    })
  })
  it('does img exist', () => {
    expect(wraper.find('img')).toBe(false)
  })
})
