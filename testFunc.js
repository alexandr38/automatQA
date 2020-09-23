function sum(a, b) {
    return a + b;
  }

  describe('Sum function', ()=>{
    test('adds 3 + 4 to equal 7',()=>{
      //preconditiion
      //============

      //action
      const result = sum(3,4);

      //assertion
      expect(result).toEqual(7);
    });
  });
    
  