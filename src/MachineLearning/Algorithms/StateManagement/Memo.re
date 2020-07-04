let useStable: ('i => 't, 'i) => 't =
  fn => {
    let cache = ref(None);
    input => {
      switch (cache^) {
      | Some(t) when input == fst(t) => snd(t)
      | _ =>
        let result = fn(input);
        cache := Some((input, result));
        result;
      };
    };
  };
