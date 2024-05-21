import { it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import RFCInput from '../RFCInput.vue'

const wrapper = mount(RFCInput)

it('renders the component', () => {
  expect(wrapper.html()).toMatchSnapshot()
})

it('does not pass RFC XXX901010', async () => {
  const input = wrapper.find('input')
  await input.setValue('XXX901010')
  expect(wrapper.vm.isValid).toBe(false)
})

it('passes RFC without homoclave XXX90101', async () => {
  const input = wrapper.find('input')
  await input.setValue('XXX90101')
  expect(wrapper.vm.isValid).toBe(true)
})

it('does not pass RFC AAAA010101AAA (personas morales)', async () => {
  const input = wrapper.find('input')
  await input.setValue('AAAA010101AAA')
  expect(wrapper.vm.isValid).toBe(false)
})

it('passes RFC AAA010101AAA (personas morales)', async () => {
  const input = wrapper.find('input')
  await input.setValue('AAA010101AAA')
  expect(wrapper.vm.isValid).toBe(true)
})
