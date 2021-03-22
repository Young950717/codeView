// 策略模式的核心思想 把算法的使用和算法的实现分开
{
  //1.年终奖事件，评级不同 年终奖的算法不同，S可以4个月工资，A是3个月，B是2倍
  {
    // 最初的实现。缺点 if else分支太多，如果需要修改的计算逻辑的话需要深入函数内部
    const calcBouns = function (preformanceLevel, salary) {
      if (preformanceLevel === 'S') {
        return salary * 4
      }
      if (preformanceLevel === 'A') {
        return salary * 3
      }
      if (preformanceLevel === 'B') {
        return salary * 2
      }
    }
    calcBouns('S', 10000)
    calcBouns('B', 8000)
  }
  {
    // 改良，通过抽离配置-算法
    const strategies = {
      S (salary) {
        return salary * 4
      },
      A (salary) {
        return salary * 3
      },
      B (salary) {
        return salary * 2
      }
    }
    const calcBouns = function (level, salary) {
      return strategies[level](salary)
    }
    calcBouns('S', 10000)
    calcBouns('B', 8000)
  }
}

{
  /*
    场景2，表单验证 
    需求 用户名不能为空，密码不能少于6位，手机号格式要正确
  */
  /*
  <form id="registerForm" action="/register" method="POST">
    用户名:<input type="text" name="username" />
    密码:<input type="password" name="password" />
    手机号:<input type="tel" name="phoneNumber" />
    <button id="btn">提交</button>
  </form>  
  */
  {
    // 初始写法 和年终奖初始版本一样，太多if else分支了，而且加别的校验的话 onsubmit函数会显得很臃肿
    const registerForm = document.getElementById('registerForm')
    registerForm.onsubmit = function () {
      if (registerForm.username.value === '') {
        console.warn('用户名不能为空')
        return false
      }
      if (registerForm.password.value.length < 6) {
        console.warn('密码不能少于6位')
        return false
      }
      if (!/^((1[3-8][0-9])+\d{8})$/.test(registerForm.phoneNumber.value)) {
        console.warn('手机号格式不正确')
        return false
      }
    }
  }
  {
    // 改用策略模式1
    const strategies = {
      isNotEmpty (value, errMsg) {
        if (value === '') {
          return errMsg
        }
      },
      minLength (value, length, errMsg) {
        if (value.length < length) {
          return errMsg
        }
      },
      isPhone (value, errMsg) {
        if (!/^((1[3-8][0-9])+\d{8})$/.test(value)) {
          return errMsg
        }
      }
    }
    class Validator {
      constructor() {
        this.cache = []
      }
      add (dom, rule, errMsg) {
        let ary = rule.split(':')
        this.cache.push(function () {
          let strategy = ary.shift()
          ary.unshift(dom.value)
          ary.push(errMsg)
          return strategies[strategy].apply(dom, ary)
        })
      }
      start () {
        for (let i = 0, validatorFn; validatorFn = this.cache[i++];) {
          const errMsg = validatorFn()
          if (errMsg) {
            return errMsg
          }
        }
      }
    }
    const registerForm = document.getElementById('registerForm')
    registerForm.onsubmit = function () {
      const validator = new Validator()
      validator.add(registerForm.username, 'isNotEmpty', '用户名不能为空')
      validator.add(registerForm.password, 'minLength:6', '密码不能少于6位')
      validator.add(registerForm.phoneNumber, 'isPhone', '手机号格式不正确')
      const errMsg = validator.start()
      if (errMsg) {
        console.warn(errMsg)
        return false
      }
    }
    // 如果需要修改验证规则，比如密码不能少于4位，则只需要修改少量的代码
    // validator.add(registerForm.password, 'minLength:4', '密码不能少于4位')
    // 如果是需要验证多个规则的话，则需要修改Validator类的实现
    // 伪代码
    validator.add(registerForm.username, [
      {
        strategy: 'isNotEmpty',
        errMsg: '用户名不能为空'
      },
      {
        strategy: 'minLength:3',
        errMsg: '用户名不能少于3位'
      },
    ])
    class Validator {
      // ...
      add (dom, rules) {
        let self = this
        rules.forEach(({ strategy, errMsg }) => {
          let ary = strategy.split(':')
          self.cache.push(function () {
            let strategy = ary.shift()
            ary.unshift(dom.value)
            ary.push(errMsg)
            return strategies[strategy].apply(dom, ary)
          })
        })
      }
    }
  }
}