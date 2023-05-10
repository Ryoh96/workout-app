import RoundForm from '@/components/organisms/RoundForm'

export default function test() {
  return (
    <RoundForm
      defaultValues={{
        weight: 0,
        repetition: 0,
        minutes: 0,
        seconds: 0,
        memo: 'hoge',
        pin: false,
      }}
      onValid={(data) => console.log(data)}
      onInvalid={(e) => console.log(e)}
    />
  )
}
